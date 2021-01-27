import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  author: "Teppo Testaaja",
  title: "Teppo on paras",
  url: "http://www.suomi24.fi",
  likes: 7,
};

test("renders title and author without url or likes", () => {
  const likeBlog = jest.fn();
  const removeBlog = jest.fn();

  const component = render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
  );

  expect(component.queryByTestId("title-text")).toHaveTextContent(blog.title);
  expect(component.queryByTestId("author-text")).toHaveTextContent(blog.author);
  expect(component.queryByTestId("url-text")).not.toBeInTheDocument();
  expect(component.queryByTestId("likes-text")).not.toBeInTheDocument();
});

test("renders all information after view button is clicked", async () => {
  const likeBlog = jest.fn();
  const removeBlog = jest.fn();

  const component = render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
  );

  fireEvent.click(component.getByTestId("view-button"));
  expect(component.getByTestId("title-text")).toHaveTextContent(blog.title);
  expect(component.getByTestId("author-text")).toHaveTextContent(blog.author);
  expect(component.getByTestId("url-text")).toHaveTextContent(blog.url);
  expect(component.getByTestId("likes-text")).toHaveTextContent(blog.likes);
});

test("like function called a correct number of times", async () => {
  const likeBlog = jest.fn();
  const removeBlog = jest.fn();

  const component = render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
  );

  fireEvent.click(component.getByTestId("view-button"));
  const likeButton = component.getByTestId("like-button");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(likeBlog.mock.calls).toHaveLength(2);
});
