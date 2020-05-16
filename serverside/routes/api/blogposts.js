const express = require("express");
const router = express.Router();
const BlogPost = require("../../models/BlogPost.js");

// Create endpoint of all BlogPosts
router.get("/", async (req, res) => {
  const blogposts = await BlogPost.query().withGraphFetched("user");
  res.json(blogposts);
});

// //get blog post by id
// router.get("/:blogPostId/", async (req, res) => {
//   const blogpost = await BlogPost.query()
//     .findById(req.param.blogPostId)
//     .withGraphFetched("user");
//   res.json(blogpost);
// });

//create new post
router.post("/", async (req, res, next) => {
  try {
    if (req.session.user) {
      const { title, content } = req.body;
      const user_id = req.session.user.id;
      const blogpost = await BlogPost.query().insert({
        title,
        content,
        user_id,
      });
      res.json(blogpost);
    } else {
      return res.status(403).send({ response: "Unauthorized" });
    }
  } catch (err) {
    next(err);
  }
});

//get all blog posts from a user
router.get("/getuserposts", async (req, res) => {
  try {
    if (req.session.user) {
      const blogpost = await BlogPost.query()
        .where("user_id", req.session.user.id)
        .withGraphFetched("user");
      res.json(blogpost);
    } else {
      return res.status(403).send({ response: "Unauthorized" });
    }
  } catch (err) {}
});

// Export to api.js
module.exports = router;
