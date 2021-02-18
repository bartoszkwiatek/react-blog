const router = require('express').Router();
let PostModel = require('./post.model');

router.route('/').get((req, res) => {
  PostModel.find().sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});


// new post
router.route('/').post((req, res) => {
  // const username = req.body.username;
  const title = req.body.title;
  const shortContent = req.body.shortContent;
  const longContent = req.body.longContent;
  const createdAt = Date.now();

  const newPost = new PostModel({
    title,
    shortContent,
    longContent,
    createdAt,
  });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get post by id
router.route('/:id').get((req, res) => {
  PostModel.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});


// delete post
router.route('/:id').delete((req, res) => {
  PostModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// update post
router.route('/:id').put((req, res) => {
  PostModel.findById(req.params.id)
    .then(post => {
      post.title = req.body.title;
      post.shortContent = req.body.shortContent;
      post.longContent = req.body.longContent;
      post.createdAt = Date.parse(req.body.createdAt);

      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;