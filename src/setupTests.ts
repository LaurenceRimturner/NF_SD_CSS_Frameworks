import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Without `globals: true` Testing Library cannot set these up on its own.
(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

// jsdom does not implement the modal methods of <dialog>.
HTMLDialogElement.prototype.showModal ??= function showModal(
  this: HTMLDialogElement
) {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close ??= function close(this: HTMLDialogElement) {
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
};

afterEach(() => {
  cleanup();
  localStorage.clear();
});
