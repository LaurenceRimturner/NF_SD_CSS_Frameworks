import type { Theme } from "../useTheme";
import Button from "./Button";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button onClick={onToggle}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}
