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
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  content: { type: String },
});
const Comment = mongoose.model("Comment", CommentSchema, "Comment");

const PostSchema = new mongoose.Schema({
  // Not Null = True, Nulable = False
  title: { type: String, required: true },
  content: { type: String },
});
const Post = mongoose.model("Post", PostSchema, "Post");

//-----------------------Ref_2-----------------------
const newPost = new Post({
  title: "Covid-19",
  content: "Có vaccine chưa",
});

const comment1 = new Comment({
  postId: newPost._id,
  content: "Vaccine đang trong giai đoạn thử nghiệm",
});

const comment2 = new Comment({
  postId: newPost._id,
  content: "Vaccine an toàn",
});

Promise.all([newPost.save(), comment1.save(), comment2.save()])
  .then(console.log)
  .catch(console.log);

Comment.find().populate("postID").then(console.log).catch(console.log);

// post -> comment
Comment.find({ postID: "5f5f7ad838de7e01c053932f" })
  .populate("postID")
  .then(console.log)
  .catch(console.log);
