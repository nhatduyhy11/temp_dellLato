const newPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //Callback(null, "Success")
      resolve("Success");
      //Callback("Fail",null)
      //reject("Fail");
    }, 1000);
  });
};

newPromise()
  .then((res) => {
    console.log("Res: ", res);
  })
  .catch((err) => {
    console.log("Err: ", err);
  });
