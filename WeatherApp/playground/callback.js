let x;

let queryData = (cb) => {
  setTimeout(() => {
    x = 10;
    console.log("Query DB successfully");
    cb();
  }, 2000);
};

let printData = () => {
  console.log(x);
};

// queryData(() => {
//   printData();
// });

queryData(printData);
