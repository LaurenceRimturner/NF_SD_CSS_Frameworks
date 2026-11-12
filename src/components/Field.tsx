import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export const INPUT_CLASSES =
  "w-full rounded-md border border-ocean/50 bg-white px-3 py-2 text-base inset-shadow-sm inset-shadow-ocean/20 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ocean aria-invalid:border-crimson";

export default function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-bold text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}
