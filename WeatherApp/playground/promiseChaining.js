const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("Invalid Input");
      }
    }, 2000);
  });
};

//1 + 2 + 3 + 4 + 5
asyncAdd(1, 2)
  .then((res) => {
    console.log(res);
    //Sự khác biệt thêm return có thể thêm then cùng cấp và 1 catch
    return asyncAdd(res, 3);
  })
  .then((res) => {
    console.log(res);
    return asyncAdd(res, 4);
  })
  .then((res) => {
    console.log(res);
    return asyncAdd(res, 5);
  })
  .then((res) => {
    console.log(res);
    return asyncAdd(res, 6);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
