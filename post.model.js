
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  shortContent: { type: String, required: true },
  longContent: { type: String, required: true },
  createdAt: { type: Date, required: true }
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;