import React, { useState } from "react";

const NewBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });
  const newBlogHandler = async (event) => {
    event.preventDefault();
    await createBlog(newBlog);
    setNewBlog({ author: "", title: "", url: "" });
  };
  return (
    <div>
      <h2>Create new</h2>
      <form data-testid="newblog-form" onSubmit={newBlogHandler}>
        <div>
          title:
          <input
            data-testid="title-field"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author:
          <input
            data-testid="author-field"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            data-testid="url-field"
            type="text"
            value={newBlog.url}
            name="URL"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button data-testid="submit-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
