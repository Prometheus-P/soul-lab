import { useEffect, useRef, useCallback, RefObject } from 'react';

/**
 * Custom hook for trapping focus within a container element
 * WCAG SC 2.4.3: Focus Order - Ensures keyboard focus stays within modal dialogs
 *
 * @param isOpen - Whether the focus trap is active
 * @param containerRef - Ref to the container element
 * @param options - Optional configuration
 */
interface UseFocusTrapOptions {
  /** Called when Escape key is pressed */
  onEscape?: () => void;
  /** Element to focus when trap activates (defaults to first focusable) */
  initialFocus?: RefObject<HTMLElement>;
  /** Element to return focus to when trap deactivates */
  returnFocus?: RefObject<HTMLElement>;
  /** Whether to auto-focus first element when opened (default: true) */
  autoFocus?: boolean;
}

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

export function useFocusTrap(
  isOpen: boolean,
  containerRef: RefObject<HTMLElement>,
  options: UseFocusTrapOptions = {}
): void {
  const { onEscape, initialFocus, returnFocus, autoFocus = true } = options;
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Get all focusable elements within container
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    const elements = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
    return Array.from(elements).filter((el) => {
      // Filter out elements with display: none or visibility: hidden
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
  }, [containerRef]);

  // Handle keydown for focus trap and escape
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || !containerRef.current) return;

      // Handle Escape key
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      // Handle Tab key for focus trap
      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        // Shift + Tab on first element -> go to last
        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        // Tab on last element -> go to first
        else if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isOpen, containerRef, getFocusableElements, onEscape]
  );

  // Set initial focus when opening
  useEffect(() => {
    if (!isOpen) return;

    // Save current active element for restoration
    previousActiveElement.current = document.activeElement as HTMLElement;

    if (!autoFocus) return;

    // Focus initial element or first focusable
    const focusTarget = initialFocus?.current || getFocusableElements()[0];
    if (focusTarget) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        focusTarget.focus();
      });
    }
  }, [isOpen, autoFocus, initialFocus, getFocusableElements]);

  // Restore focus when closing
  useEffect(() => {
    if (isOpen) return;

    const elementToFocus = returnFocus?.current || previousActiveElement.current;
    if (elementToFocus && typeof elementToFocus.focus === 'function') {
      elementToFocus.focus();
    }
  }, [isOpen, returnFocus]);

  // Add keydown listener
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Prevent focus from leaving the container
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!containerRef.current?.contains(target)) {
        // Focus escaped the trap, bring it back
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isOpen, containerRef, getFocusableElements]);
}

export default useFocusTrap;
