const yargs = require("yargs");
const { getLocation } = require("../promiseServices/googleApis");
const { getDarkSky } = require("../promiseServices/darkskyApis");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Enter your address",
      string: true,
    },
  })
  .help()
  .alias("help", "h").argv;

const address = argv.address;

getLocation(address)
  .then((res) => {
    const { lat, lng } = res;
    return getDarkSky(lat, lng);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
