import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "btn-dark",
  secondary: "btn-outline-dark",
  danger: "btn-danger",
};

export default function Button({
  variant = "secondary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn fw-bold text-uppercase ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
