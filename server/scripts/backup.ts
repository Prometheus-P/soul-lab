#!/usr/bin/env npx tsx
/**
 * Data Backup Script
 *
 * Creates timestamped backups of all JSON data files.
 * Supports local storage with optional S3/GCS upload.
 *
 * Usage:
 *   pnpm backup              # Create local backup
 *   pnpm backup --upload     # Create and upload to S3
 *   pnpm backup --cleanup    # Create backup and cleanup old ones
 *
 * Environment Variables:
 *   DATA_DIR          - Source data directory (default: data)
 *   BACKUP_DIR        - Local backup directory (default: backups)
 *   BACKUP_RETENTION  - Days to keep backups (default: 7)
 *   AWS_S3_BUCKET     - S3 bucket name for remote backup
 *   AWS_REGION        - AWS region (default: ap-northeast-2)
 *
 * Issue #13: 데이터 백업 자동화
 */

import fs from 'node:fs';
import path from 'node:path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { createWriteStream } from 'node:fs';

// Configuration
const DATA_DIR = process.env.DATA_DIR || 'data';
const BACKUP_DIR = process.env.BACKUP_DIR || 'backups';
const BACKUP_RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION || '7', 10);

// CLI flags
const args = process.argv.slice(2);
const shouldUpload = args.includes('--upload');
const shouldCleanup = args.includes('--cleanup') || args.includes('--clean');
const isQuiet = args.includes('--quiet') || args.includes('-q');

function log(message: string) {
  if (!isQuiet) {
    console.log(`[backup] ${message}`);
  }
}

function error(message: string) {
  console.error(`[backup:error] ${message}`);
}

function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hour}${minute}${second}`;
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getDataFiles(): string[] {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`Data directory not found: ${DATA_DIR}`);
  }
  const files = fs.readdirSync(DATA_DIR);
  return files.filter((file) => file.endsWith('.json'));
}

interface BackupManifest {
  version: 1;
  createdAt: string;
  dataDir: string;
  files: Array<{ name: string; size: number; modifiedAt: string }>;
  checksums: Record<string, string>;
}

function createManifest(files: string[]): BackupManifest {
  const manifest: BackupManifest = {
    version: 1,
    createdAt: new Date().toISOString(),
    dataDir: DATA_DIR,
    files: [],
    checksums: {},
  };

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    let hash = 2166136261;
    for (let i = 0; i < content.length; i++) {
      hash ^= content.charCodeAt(i);
      hash = (hash * 16777619) >>> 0;
    }
    const checksum = hash.toString(16).padStart(8, '0');
    manifest.files.push({ name: file, size: stats.size, modifiedAt: stats.mtime.toISOString() });
    manifest.checksums[file] = checksum;
  }
  return manifest;
}

async function createBackup(): Promise<string> {
  const timestamp = getTimestamp();
  const backupName = `backup_${timestamp}`;
  const backupPath = path.join(BACKUP_DIR, backupName);

  ensureDir(BACKUP_DIR);
  ensureDir(backupPath);

  log(`Creating backup: ${backupName}`);

  const files = getDataFiles();
  if (files.length === 0) throw new Error('No data files found to backup');

  log(`Found ${files.length} files to backup`);

  for (const file of files) {
    const src = path.join(DATA_DIR, file);
    const dest = path.join(backupPath, file);
    fs.copyFileSync(src, dest);
    log(`  Copied: ${file}`);
  }

  const manifest = createManifest(files);
  const manifestPath = path.join(backupPath, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  log('  Created: manifest.json');

  const archivePath = `${backupPath}.tar.gz`;
  await createTarGz(backupPath, archivePath);
  log(`  Created: ${backupName}.tar.gz`);

  fs.rmSync(backupPath, { recursive: true });

  const archiveStats = fs.statSync(archivePath);
  const sizeMB = (archiveStats.size / 1024 / 1024).toFixed(2);
  log(`Backup complete: ${sizeMB} MB`);

  return archivePath;
}

async function createTarGz(sourceDir: string, destPath: string): Promise<void> {
  const bundle: Record<string, string> = {};
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    bundle[file] = fs.readFileSync(filePath, 'utf-8');
  }
  const jsonContent = JSON.stringify(bundle);
  await pipeline(Readable.from([jsonContent]), createGzip(), createWriteStream(destPath));
}

async function uploadToS3(archivePath: string): Promise<void> {
  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION || 'ap-northeast-2';
  if (!bucket) { error('AWS_S3_BUCKET not configured. Skipping upload.'); return; }

  try {
    const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
    const client = new S3Client({ region });
    const key = `backups/${path.basename(archivePath)}`;
    const body = fs.readFileSync(archivePath);
    await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: 'application/gzip' }));
    log(`Uploaded to S3: s3://${bucket}/${key}`);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ERR_MODULE_NOT_FOUND') {
      error('AWS SDK not installed. Run: pnpm add @aws-sdk/client-s3');
    } else throw err;
  }
}

function cleanupOldBackups(): void {
  if (!fs.existsSync(BACKUP_DIR)) return;
  const now = Date.now();
  const maxAge = BACKUP_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const files = fs.readdirSync(BACKUP_DIR);
  let deleted = 0;

  for (const file of files) {
    if (!file.startsWith('backup_') || !file.endsWith('.tar.gz')) continue;
    const filePath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filePath);
    if (now - stats.mtime.getTime() > maxAge) {
      fs.unlinkSync(filePath);
      log(`Deleted old backup: ${file}`);
      deleted++;
    }
  }
  if (deleted > 0) log(`Cleaned up ${deleted} old backup(s)`);
}

function listBackups(): void {
  if (!fs.existsSync(BACKUP_DIR)) { log('No backups found'); return; }
  const files = fs.readdirSync(BACKUP_DIR).filter((f) => f.startsWith('backup_') && f.endsWith('.tar.gz')).sort().reverse();
  if (files.length === 0) { log('No backups found'); return; }
  console.log('\nExisting backups:');
  for (const file of files) {
    const filePath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  ${file} (${sizeMB} MB)`);
  }
  console.log(`\nTotal: ${files.length} backup(s)`);
}

async function main(): Promise<void> {
  try {
    if (args.includes('--list')) { listBackups(); return; }
    if (args.includes('--help') || args.includes('-h')) {
      console.log(`
Data Backup Script

Usage:
  pnpm backup              Create local backup
  pnpm backup --upload     Create and upload to S3
  pnpm backup --cleanup    Create backup and cleanup old ones
  pnpm backup --list       List existing backups

Options:
  --upload     Upload backup to S3 (requires AWS_S3_BUCKET)
  --cleanup    Remove backups older than BACKUP_RETENTION days
  --list       List existing backups
  --quiet, -q  Suppress output
  --help, -h   Show this help

Environment:
  DATA_DIR          Source directory (default: data)
  BACKUP_DIR        Backup directory (default: backups)
  BACKUP_RETENTION  Days to keep (default: 7)
  AWS_S3_BUCKET     S3 bucket for remote backup
  AWS_REGION        AWS region (default: ap-northeast-2)
`);
      return;
    }

    const archivePath = await createBackup();
    if (shouldUpload) await uploadToS3(archivePath);
    if (shouldCleanup) cleanupOldBackups();
    log('Done!');
  } catch (err) {
    error(String(err));
    process.exit(1);
  }
}

main();
