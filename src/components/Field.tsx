import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

// The error sits after the control, Bootstrap shows `.invalid-feedback`
// next to an `.is-invalid` control.
export default function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="form-label fw-bold text-uppercase small">
        {label}
      </label>
      {children}
      {error && (
        <div id={`${id}-error`} className="invalid-feedback fw-bold">
          {error}
        </div>
      )}
    </div>
  );
}
