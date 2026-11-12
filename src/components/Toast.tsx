import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onDismiss: () => void;
};

const DURATION_MS = 3000;

// The live region is always in the DOM, so screen readers announce changes.
export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, DURATION_MS);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center md:justify-end"
    >
      {message && (
        <p className="border-2 border-ink bg-signal px-4 py-3 text-sm font-bold uppercase tracking-wider text-ink">
          {message}
        </p>
      )}
    </div>
  );
}
