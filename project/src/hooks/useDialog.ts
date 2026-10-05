import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Modal behaviour shared by every dialog: Esc closes it, the page behind stops
 * scrolling, and focus moves to `focusRef` when it opens.
 */
export function useDialog(onClose: () => void, focusRef?: RefObject<HTMLElement>) {
  // Keep the latest onClose without re-running the mount effect when callers pass an inline function.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    focusRef?.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
    // focusRef is a stable ref object; run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
