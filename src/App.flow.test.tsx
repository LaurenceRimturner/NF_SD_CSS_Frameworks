import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import App from "./App";

// The books only. Toasts are list items too, and a dialog hides the rest.
function bookCards(): NodeListOf<Element> {
  return document.querySelectorAll("main ul > li");
}

function cardOf(title: string): HTMLElement {
  const card = screen.getByRole("heading", { name: title }).closest("li");
  if (!card) throw new Error(`No card for ${title}`);
  return card;
}

test("adds a book, shows a toast and keeps it after a reload", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  await user.click(screen.getByRole("button", { name: "+ Add book" }));
  const dialog = screen.getByRole("dialog", { name: "Add book" });
  await user.type(within(dialog).getByLabelText("Title"), "Ubik");
  await user.type(within(dialog).getByLabelText("Author"), "Philip K. Dick");
  await user.selectOptions(within(dialog).getByLabelText("Rating"), "4");
  await user.click(within(dialog).getByRole("button", { name: "Save" }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(await screen.findByText("Book added")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Ubik" })).toBeInTheDocument();
  expect(bookCards()).toHaveLength(11);

  unmount();
  render(<App />);
  expect(screen.getByRole("heading", { name: "Ubik" })).toBeInTheDocument();
});

test("does not save without title and author and shows messages", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "+ Add book" }));
  await user.click(screen.getByRole("button", { name: "Save" }));

  expect(screen.getByText("Title is required")).toBeInTheDocument();
  expect(screen.getByText("Author is required")).toBeInTheDocument();
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(bookCards()).toHaveLength(10);
});

test("edits a book", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(within(cardOf("Dune")).getByRole("button", { name: "Edit" }));
  const title = screen.getByLabelText("Title");
  expect(title).toHaveValue("Dune");
  await user.clear(title);
  await user.type(title, "Dune Messiah");
  await user.click(screen.getByRole("button", { name: "Save" }));

  expect(
    screen.getByRole("heading", { name: "Dune Messiah" })
  ).toBeInTheDocument();
  expect(await screen.findByText("Book updated")).toBeInTheDocument();
});

test("deletes a book only after confirmation", async () => {
  const user = userEvent.setup();
  render(<App />);

  const deleteButton = within(cardOf("Dune")).getByRole("button", {
    name: "Delete",
  });

  await user.click(deleteButton);
  await user.click(screen.getByRole("button", { name: "Cancel" }));
  expect(screen.getByRole("heading", { name: "Dune" })).toBeInTheDocument();
  expect(deleteButton).toHaveFocus();

  await user.click(deleteButton);
  const dialog = screen.getByRole("dialog", { name: "Delete book?" });
  expect(dialog).toHaveTextContent("Dune");
  await user.click(within(dialog).getByRole("button", { name: "Delete" }));

  expect(
    screen.queryByRole("heading", { name: "Dune" })
  ).not.toBeInTheDocument();
  expect(await screen.findByText("Book deleted")).toBeInTheDocument();
});

test("filter and search work together and the empty state shows", async () => {
  const user = userEvent.setup();
  render(<App />);

  const group = screen.getByRole("group", { name: "Filter by status" });
  await user.click(within(group).getByRole("button", { name: "Done" }));
  expect(bookCards().length).toBeLessThan(10);

  const search = screen.getByLabelText("Search by title");
  await user.type(search, "dune");
  expect(bookCards()).toHaveLength(1);

  await user.clear(search);
  await user.type(search, "zzzz");
  expect(bookCards()).toHaveLength(0);
  expect(screen.getByText("No books found")).toBeInTheDocument();
});
