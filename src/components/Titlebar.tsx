import type { ReactNode } from "react";

type TitlebarProps = {
  children: ReactNode;
};

// The title bar is part of the glass frame, so it has no background of its own.
// The white glow keeps the dark text readable like on Vista.
export default function Titlebar({ children }: TitlebarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-1.5 text-shadow-sm text-shadow-white">
      {children}
    </div>
  );
}
