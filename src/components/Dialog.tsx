import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

type DialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

// Render it only while it is open. The native modal <dialog> traps the focus
// and closes on Escape. We give the focus back to the opener ourselves.
export default function Dialog({ title, onClose, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [opener] = useState(() => document.activeElement);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [opener]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      className="border bg-body text-body p-4"
    >
      <h2 id={titleId} className="h2 fw-bold mb-4">
        {title}
      </h2>
      {children}
    </dialog>
  );
}
