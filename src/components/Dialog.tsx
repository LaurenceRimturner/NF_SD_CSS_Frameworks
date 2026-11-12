import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

import { GLASS, Shine } from "./Panel";
import Titlebar from "./Titlebar";

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
      className={`${GLASS} m-auto w-[calc(100%-2rem)] max-w-lg bg-sky/30 p-1.5 text-ink shadow-2xl backdrop:bg-ocean/40 backdrop:backdrop-blur-sm`}
    >
      <Shine />
      <div className="relative">
        <Titlebar>
          <h2 id={titleId} className="text-lg font-bold">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-crimson bg-crimson/15 bg-linear-to-b from-white/70 from-50% to-white/0 to-50% px-2 text-sm font-bold text-crimson hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
          >
            &#x2715;
          </button>
        </Titlebar>
        <div className="rounded-lg border border-ocean/30 bg-white/95 p-6">
          {children}
        </div>
      </div>
    </dialog>
  );
}
