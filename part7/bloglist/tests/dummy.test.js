const listHelper = require("../utils/list_helper");
const { newBlog, initialBlogs } = require("../utils/test_helper");
test("dummy returns 1", () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe("total likes", () => {
  test("of empty list is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the like of that", () => {
    expect(listHelper.totalLikes(newBlog)).toBe(newBlog[0].likes);
  });

  test("of a bigger  list is calculated right", () => {
    expect(listHelper.totalLikes(initialBlogs)).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.favoriteBlog(initialBlogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
