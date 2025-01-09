const { Router } = require("express");

const postsRouter = Router();

postsRouter.get("/", async (req, res) => {
  const posts = await postsModel.find();

  res.json(posts);
  
});

module.exports = postsRouter;
