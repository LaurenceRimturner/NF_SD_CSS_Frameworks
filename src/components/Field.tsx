import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export const INPUT_CLASSES =
  "w-full border-2 border-ink bg-paper px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-accent";

export default function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-bold text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
