const yargs = require("yargs");
const { getDarkSky } = require("../services/darkskyApis");
const { getLocation } = require("../services/googleApis");

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
console.log(argv);

const address = argv.address;

getLocation(address, (err, res) => {
  if (err) return console.log(err);
  console.log(res);
  const { lat, lng } = res;
  getDarkSky(lat, lng, (err, res) => {
    if (err) return console.log(err);
    console.log(res);
  });
});
