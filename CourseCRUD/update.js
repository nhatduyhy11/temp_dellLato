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

//--------------UPDATE---------------
//C1:
// Course.updateOne(
//   { _id: "5f5b7ef02137ec33404aa87f" },
//   { $set: { name: "NodeJS v2" } }
// )
//   .then(console.log)
//   .catch(console.log);

//C2:
// Course.findById("5f5b7ef02137ec33404aa87f")
//   .then((course) => {
//     if (!course) {
//       return Promise.reject({ message: "Course Not Found" });
//     }
//     course.name = "NodeJS v3";
//     return course.save();
//   })
//   .then((course) => console.log(course))
//   .catch(console.log);

//--------------DELETE---------------
//C1:
Course.deleteOne({ _id: "5f5b7ef02137ec33404aa883" })
  .then(console.log)
  .catch(console.log);

//C2:
Course.findById("5f5b7ef02137ec33404aa883")
  .then((course) => {
    if (!course) {
      return Promise.reject({ message: "Course Not Found" });
    }
    //remove()
    return course.deleteOne();
  })
  .then((course) => console.log(course))
  .catch(console.log);
