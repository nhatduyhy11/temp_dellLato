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
  commentIdArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
const Post = mongoose.model("Post", PostSchema, "Post");

//-----------------------Ref_1-----------------------
const newPost = new Post({
  title: "Covid-19",
  content: "Có vaccine chưa",
});

const comment1 = new Comment({
  content: "Vaccine đang trong giai đoạn thử nghiệm",
});

const comment2 = new Comment({
  content: "Vaccine an toàn",
});

newPost.commentIdArray.push(comment1);
newPost.commentIdArray.push(comment2);

Promise.all([newPost.save(), comment1.save(), comment2.save()])
  .then(console.log)
  .catch(console.log);

Post.find()
  .populate("commentIdArray")
  .then((res) => console.log(JSON.stringify(res, undefined, 2)))
  .catch(console.log);
