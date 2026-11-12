import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export default function FormField({
  id,
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-bold">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-bold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
