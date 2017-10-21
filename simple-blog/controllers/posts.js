const express = require('express');
const models = require('../models');

const PostsController = {
  registerRouter() {
    const router = express.Router();

    // Instead of this: we have lines 12 and 13, which calls index function
    // router.get( => (req,res) {
      // res.send("Hello World")
    // })
    router.get('/', this.index);
    router.post('/', this.create);

    return router;
  },
  index(req, res) {
    models.Posts.findAll({ order: [['id', 'DESC']]}) // return post with id by descending order because default is ascending order
      .then((posts) => {
        res.render('posts', { posts });
        //res.json(posts); // to see the json
      });
  },
  create(req, res) {
    models.Posts.create({
      post: req.body.post,
      author: req.body.author
    })
    .then((post) => {
      res.redirect('/posts');
    })
    .catch((err) => {
      console.log('ERROR while creating a new post');
      res.redirect('/error');
    })
  }
};

module.exports = PostsController.registerRouter();
