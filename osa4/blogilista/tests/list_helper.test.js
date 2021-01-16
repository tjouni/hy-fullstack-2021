const listHelper = require("../utils/list_helper");
const {
  listWithNoBlogs,
  listWithOneBlog,
  listWithManyBlogs,
} = require("./test_helper");

test("dummy returns one", () => {
  const result = listHelper.dummy(listWithNoBlogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has no blogs equals 0", () => {
    const result = listHelper.totalLikes(listWithNoBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has many blogs equals the total likes of the blogs", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe("total likes", () => {
  test("when list has no blogs equals null", () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog equals the only blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0]);
  });

  test("when list has many blogs equals the most liked blog", () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most blogs by author", () => {
  test("when list has no blogs equals null", () => {
    const result = listHelper.mostBlogs(listWithNoBlogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog equals the only blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    });
  });

  test("when list has many blogs equals the most liked blog", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes by author", () => {
  test("when list has no blogs equals null", () => {
    const result = listHelper.mostLikes(listWithNoBlogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog equals the only blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: 5,
    });
  });

  test("when list has many blogs equals the most liked blog", () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
