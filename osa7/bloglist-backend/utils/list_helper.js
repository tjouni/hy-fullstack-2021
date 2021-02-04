const _ = require("lodash");

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  return !blogs.length
    ? null
    : blogs.reduce((previous, current) =>
        previous.likes > current.likes ? previous : current
      );
};

const mostBlogs = (blogs) => {
  return !blogs.length
    ? null
    : _(blogs)
        .groupBy("author")
        .map((obj, key) => ({ author: key, blogs: _.size(obj) }))
        .maxBy((obj) => obj.blogs);
};

const mostLikes = (blogs) => {
  return !blogs.length
    ? null
    : _(blogs)
        .groupBy("author")
        .map((obj, key) => ({ author: key, likes: _.sumBy(obj, "likes") }))
        .maxBy((obj) => obj.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
