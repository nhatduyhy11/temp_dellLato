const mongoose = require("mongoose");
const data = require("./data.json");

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

// const course_1 = new Course({
//   name: "MongoDB",
//   author: "CyberSoft",
//   tags: ["NoSQL", "MongoDB", "Database"],
//   isPublished: false,
//   price: 20,
// });

// course_1.save().then(console.log).catch(console.log);

//C1: Import for of
// for (let course of data) {
//   const newCourse = new Course(course);
//   newCourse.save().then(console.log).catch(console.log);
// }

//C2:
const createCourse = async (course) => {
  return await Course.create(course);
};

const createCourseArray = data.map((course) => createCourse(course));

Promise.all(createCourseArray).then(console.log).catch(console.log);

