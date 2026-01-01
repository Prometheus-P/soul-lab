#!/usr/bin/env npx tsx
/**
 * Data Restore Script
 *
 * Restores data from a backup archive.
 *
 * Usage:
 *   pnpm restore <backup-file>        # Restore from specific backup
 *   pnpm restore --latest             # Restore from latest backup
 *   pnpm restore --list               # List available backups
 *   pnpm restore --verify <backup>    # Verify backup integrity
 *
 * Environment Variables:
 *   DATA_DIR    - Target data directory (default: data)
 *   BACKUP_DIR  - Backup directory (default: backups)
 *
 * Issue #13: 데이터 백업 자동화
 */

import fs from 'node:fs';
import path from 'node:path';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';
import * as readline from 'node:readline';

// Configuration
const DATA_DIR = process.env.DATA_DIR || 'data';
const BACKUP_DIR = process.env.BACKUP_DIR || 'backups';

// CLI args
const args = process.argv.slice(2);
const isQuiet = args.includes('--quiet') || args.includes('-q');
const shouldForce = args.includes('--force') || args.includes('-f');

function log(message: string) {
  if (!isQuiet) console.log(`[restore] ${message}`);
}

function error(message: string) {
  console.error(`[restore:error] ${message}`);
}

async function confirm(message: string): Promise<boolean> {
  if (shouldForce) return true;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

function listBackups(): string[] {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs.readdirSync(BACKUP_DIR).filter((f) => f.startsWith('backup_') && f.endsWith('.tar.gz')).sort().reverse();
}

function getLatestBackup(): string | null {
  const backups = listBackups();
  return backups.length > 0 ? path.join(BACKUP_DIR, backups[0]) : null;
}

async function extractBackup(archivePath: string): Promise<Record<string, string>> {
  if (!fs.existsSync(archivePath)) throw new Error(`Backup file not found: ${archivePath}`);
  const chunks: Buffer[] = [];
  await pipeline(createReadStream(archivePath), createGunzip(), async function* (source) {
    for await (const chunk of source) chunks.push(chunk as Buffer);
  });
  return JSON.parse(Buffer.concat(chunks).toString('utf-8')) as Record<string, string>;
}

interface BackupManifest {
  version: number;
  createdAt: string;
  dataDir: string;
  files: Array<{ name: string; size: number; modifiedAt: string }>;
  checksums: Record<string, string>;
}

function computeChecksum(content: string): string {
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++) { hash ^= content.charCodeAt(i); hash = (hash * 16777619) >>> 0; }
  return hash.toString(16).padStart(8, '0');
}

async function verifyBackup(archivePath: string): Promise<boolean> {
  log(`Verifying: ${path.basename(archivePath)}`);
  try {
    const files = await extractBackup(archivePath);
    if (!files['manifest.json']) { error('Missing manifest.json in backup'); return false; }
    const manifest: BackupManifest = JSON.parse(files['manifest.json']);
    log(`Backup created: ${manifest.createdAt}`);
    log(`Files: ${manifest.files.length}`);

    let valid = true;
    for (const fileInfo of manifest.files) {
      const content = files[fileInfo.name];
      if (!content) { error(`Missing file: ${fileInfo.name}`); valid = false; continue; }
      const expectedChecksum = manifest.checksums[fileInfo.name];
      const actualChecksum = computeChecksum(content);
      if (expectedChecksum !== actualChecksum) { error(`Checksum mismatch: ${fileInfo.name}`); valid = false; }
      else log(`  ✓ ${fileInfo.name}`);
    }
    if (valid) log('Backup integrity verified!');
    else error('Backup verification failed!');
    return valid;
  } catch (err) { error(`Verification failed: ${err}`); return false; }
}

async function restoreBackup(archivePath: string): Promise<void> {
  log(`Restoring from: ${path.basename(archivePath)}`);
  const isValid = await verifyBackup(archivePath);
  if (!isValid && !shouldForce) throw new Error('Backup verification failed. Use --force to restore anyway.');

  const confirmed = await confirm(`\nThis will OVERWRITE all data in ${DATA_DIR}. Continue?`);
  if (!confirmed) { log('Restoration cancelled.'); return; }

  const files = await extractBackup(archivePath);
  const manifest: BackupManifest = JSON.parse(files['manifest.json']);

  const preRestoreDir = path.join(BACKUP_DIR, `pre_restore_${Date.now()}`);
  if (fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(preRestoreDir, { recursive: true });
    const currentFiles = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
    for (const file of currentFiles) fs.copyFileSync(path.join(DATA_DIR, file), path.join(preRestoreDir, file));
    log(`Current data backed up to: ${preRestoreDir}`);
  }

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  let restored = 0;
  for (const fileInfo of manifest.files) {
    const content = files[fileInfo.name];
    if (content) { fs.writeFileSync(path.join(DATA_DIR, fileInfo.name), content, 'utf-8'); log(`  Restored: ${fileInfo.name}`); restored++; }
  }

  log(`\nRestoration complete! ${restored} file(s) restored.`);
  log(`Original data saved to: ${preRestoreDir}`);
}

function printHelp(): void {
  console.log(`
Data Restore Script

Usage:
  pnpm restore <backup-file>       Restore from specific backup
  pnpm restore --latest            Restore from latest local backup
  pnpm restore --list              List available backups
  pnpm restore --verify <backup>   Verify backup integrity

Options:
  --latest          Use the most recent backup
  --list            List available backups
  --verify          Verify backup without restoring
  --force, -f       Skip confirmation prompts
  --quiet, -q       Suppress output
  --help, -h        Show this help

Environment:
  DATA_DIR       Target directory (default: data)
  BACKUP_DIR     Backup directory (default: backups)
`);
}

async function main(): Promise<void> {
  try {
    if (args.includes('--help') || args.includes('-h')) { printHelp(); return; }
    if (args.includes('--list')) {
      const backups = listBackups();
      if (backups.length === 0) { log('No backups found'); return; }
      console.log('\nAvailable backups:');
      for (const backup of backups) {
        const filePath = path.join(BACKUP_DIR, backup);
        const stats = fs.statSync(filePath);
        console.log(`  ${backup} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      }
      console.log(`\nTotal: ${backups.length} backup(s)`);
      return;
    }
    if (args.includes('--verify')) {
      const verifyIndex = args.indexOf('--verify');
      const backupArg = args[verifyIndex + 1];
      if (!backupArg) { error('Please specify a backup file to verify'); process.exit(1); }
      const backupPath = backupArg.includes('/') ? backupArg : path.join(BACKUP_DIR, backupArg);
      const isValid = await verifyBackup(backupPath);
      process.exit(isValid ? 0 : 1);
    }
    if (args.includes('--latest')) {
      const latest = getLatestBackup();
      if (!latest) { error('No backups found'); process.exit(1); }
      await restoreBackup(latest);
      return;
    }
    const backupArg = args.find((a) => !a.startsWith('-'));
    if (backupArg) {
      const backupPath = backupArg.includes('/') ? backupArg : path.join(BACKUP_DIR, backupArg);
      await restoreBackup(backupPath);
      return;
    }
    printHelp();
  } catch (err) { error(String(err)); process.exit(1); }
}

main();
