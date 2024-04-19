const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/fs10-social-network", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected Success");
  })
  .catch(console.log);

const CommentSchema = new mongoose.Schema({
  content: { type: String },
});
const Comment = mongoose.model("Comment", CommentSchema, "Comment");

const PostSchema = new mongoose.Schema({
  // Not Null = True, Nulable = False
  title: { type: String, required: true },
  content: { type: String },
  comments: [CommentSchema],
});
const Post = mongoose.model("Post", PostSchema, "Post");

//-----------------------Embedding-----------------------
const createPost = async (title, content) => {
  return await Post.create({ title, content });
};

// Tạo post
// createPost("Covid 19", "Sap co vaccine");

// Tạo comment
const comment = new Comment({ content: "Chắc chắn :)" });
Post.findById("5f5f73d50dcbc40b1ca4b1aa")
  .then((post) => {
    if (!post) return Promise.reject({ message: "Post Not Found" });

    post.comments.push(comment);

    return post.save();
  })
  .then(console.log)
  .catch(console.log);
