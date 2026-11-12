import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "border-ink bg-ink text-paper hover:border-accent hover:bg-accent",
  secondary: "border-ink bg-paper text-ink hover:bg-ink hover:text-paper",
  danger: "border-accent bg-accent text-paper hover:border-ink hover:bg-ink",
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
      className={`cursor-pointer border-2 px-4 py-2 text-sm font-bold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
