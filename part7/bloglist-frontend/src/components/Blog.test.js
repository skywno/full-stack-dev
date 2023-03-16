import React from "react";
import { jest } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

let container;
let mockDeleteHandler;
let mockLikesClickHandler;
beforeEach(() => {
  const blog = {
    title: "title",
    author: "author",
    url: "url:url.com",
    likes: 5,
  };

  mockDeleteHandler = jest.fn();
  mockLikesClickHandler = jest.fn();

  container = render(
    <Blog
      blog={blog}
      handleDelete={mockDeleteHandler}
      handleLikesClick={mockLikesClickHandler}
    />
  ).container;
});

test("5.13: at start, only title and author are displayed, not url and likes", () => {
  const div = container.querySelector(".blogInDetail");
  expect(div).toHaveStyle("display:none");
});

test("5.14: after clicking the button, url and likes will are displayed", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".blogInDetail");
  expect(div).toHaveStyle("display:block");
});

test("5.15: eventHandler called twice, when like button is clicked twice", async () => {
  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockLikesClickHandler.mock.calls).toHaveLength(2);
});
