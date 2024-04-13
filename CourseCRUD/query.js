const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/fs10-course", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  //   .catch((err) => console.log(err))
  .catch(console.log);

const CourseSchema = new mongoose.Schema({
  name: String,
  author: { type: String }, //String
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", CourseSchema, "Course");

//Query
Course.find({
  author: "Mosh",
  isPublished: true,
  price: { $gt: 10 },
  //price: { $in: [10, 12] },
})
  //.select("name price -_id")
  .select({ name: 1, price: 1, _id: 0 })
  .sort({ price: -1 })
  .then(console.log)
  .catch(console.log);

Course.find()
  //.or([{ author: "Mosh" }, { isPublished: true }, { price: { $gt: 10 } }]) //and
  .select({ name: 1, price: 1, _id: 0 })
  .sort({ price: "desc" })
  .limit(2)
  .skip(2)
  .then(console.log)
  .catch(console.log);

Course
  // .find({ name: /^Node/i })
  // .find({ name: /js$/i })
  .find({ name: /.*JS.*/i })
  .select({ name: 1, price: 1, _id: 0 })
  .sort({ price: "desc" })
  .then(console.log)
  .catch(console.log);

Course.find({ isPublished: true, tags: "backend" })
  .sort({ name: 1 })
  .select("name author -_id")
  .then(console.log)
  .catch(console.log);

Course.find({ isPublished: true, tags: { $in: ["backend", "frontend"] } })
  .sort({ price: -1 })
  .select("name author -_id")
  .then(console.log)
  .catch(console.log);

Course.find({
  isPublished: true,
  price: { $gt: 15 },
  name: /.*by.*/i,
})
  .then(console.log)
  .catch(console.log);

// -------------Find------------------
Course.findById("5f5b7ef02137ec33404aa880")
  .then(console.log)
  .catch(console.log);

Course.findOne({ isPublished: true }).then(console.log).catch(console.log);

