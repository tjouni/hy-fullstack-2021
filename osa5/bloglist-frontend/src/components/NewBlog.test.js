import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import NewBlog from "./NewBlog";

const blog = {
  author: "Teppo Testaaja",
  title: "Teppo on paras",
  url: "http://www.suomi24.fi",
};

test("createBlog function called with correct infromation", async () => {
  const createBlog = jest.fn();
  act(() => {
    render(<NewBlog createBlog={createBlog} />);
  });
  const form = screen.getByTestId("newblog-form");

  expect(screen.getByTestId("title-field")).toBeInTheDocument();
  expect(screen.getByTestId("author-field")).toBeInTheDocument();
  expect(screen.getByTestId("url-field")).toBeInTheDocument();

  fireEvent.change(screen.getByTestId("title-field"), {
    target: { value: blog.title },
  });
  fireEvent.change(screen.getByTestId("author-field"), {
    target: { value: blog.author },
  });
  fireEvent.change(screen.getByTestId("url-field"), {
    target: { value: blog.url },
  });
  act(() => {
    expect(screen.getByTestId("title-field")).toHaveValue(blog.title);
    expect(screen.getByTestId("author-field")).toHaveValue(blog.author);
    expect(screen.getByTestId("url-field")).toHaveValue(blog.url);
    fireEvent.submit(form);
  });
  await waitFor(() => expect(createBlog).toHaveBeenCalledTimes(1));
  expect(createBlog.mock.calls[0][0]).toEqual(blog);
});
