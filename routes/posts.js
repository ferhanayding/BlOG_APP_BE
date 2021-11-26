const router = require("express").Router();
const Post = require("../model/Post");
const User = require("../model/User");

// create -----------------------------------------
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  // if (req.body.photo) {
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(500).json("required field : photo ");
  // }
});
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (error) {
        re.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update only your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete ------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can delete only your posts!!!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get post --------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get all posts for username or categoryname
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
