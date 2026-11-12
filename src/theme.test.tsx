import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import App from "./App";
import { THEME_STORAGE_KEY } from "./useTheme";

type Listener = () => void;

// A minimal `matchMedia` that can switch the system setting.
function mockSystemTheme(initial: "light" | "dark") {
  let dark = initial === "dark";
  const listeners = new Set<Listener>();
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return dark;
    },
    addEventListener: (_: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) =>
      listeners.delete(listener),
  }));
  return (next: "light" | "dark") => {
    dark = next === "dark";
    listeners.forEach((listener) => listener());
  };
}

const theme = () => document.documentElement.getAttribute("data-bs-theme");

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute("data-bs-theme");
});

test("follows the system setting", () => {
  mockSystemTheme("dark");
  render(<App />);
  expect(theme()).toBe("dark");
  expect(screen.getByRole("button", { name: "Light mode" })).toBeInTheDocument();
});

test("follows a change of the system setting while the page is open", () => {
  const setSystem = mockSystemTheme("light");
  render(<App />);
  expect(theme()).toBe("light");
  act(() => setSystem("dark"));
  expect(theme()).toBe("dark");
});

test("the toggle switches the theme and the choice is kept", async () => {
  const user = userEvent.setup();
  mockSystemTheme("light");
  const { unmount } = render(<App />);

  await user.click(screen.getByRole("button", { name: "Dark mode" }));
  expect(theme()).toBe("dark");
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

  unmount();
  render(<App />);
  expect(theme()).toBe("dark");
});

test("a stored choice wins over the system setting", () => {
  mockSystemTheme("dark");
  localStorage.setItem(THEME_STORAGE_KEY, "light");
  render(<App />);
  expect(theme()).toBe("light");
});

test("works without matchMedia and defaults to light", () => {
  render(<App />);
  expect(theme()).toBe("light");
});
