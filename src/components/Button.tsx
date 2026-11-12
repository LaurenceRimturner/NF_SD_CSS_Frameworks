import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

// The gloss is a white layer on the top half, like the Aero buttons.
const BASE =
  "cursor-pointer rounded-md border px-4 py-2 text-sm font-bold shadow-sm shadow-ocean/40 inset-shadow-xs inset-shadow-white/80 bg-linear-to-b from-white/70 from-50% to-white/0 to-50% transition hover:brightness-105 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "border-ocean bg-sky text-ink",
  secondary: "border-ocean/60 bg-ocean/15 text-ink",
  danger: "border-crimson bg-crimson/15 text-crimson",
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
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
