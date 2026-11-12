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
      className="position-fixed bottom-0 end-0 p-3 pe-none"
    >
      {message && (
        <div className="alert alert-warning border-dark fw-bold text-uppercase small mb-0">
          {message}
        </div>
      )}
    </div>
  );
}
