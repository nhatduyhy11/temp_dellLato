const request = require("request");
const { config } = require("../config");
//const exportConfig = require("../config");
//const config = exportConfig

//callback(err, res)
const getDarkSky = (lat, lng, callback) => {
  request.get(
    {
      url: `${config.darksky.url}/${config.darksky.key}/${lat},${lng}`,
      json: true,
    },
    //Tự handle err

    //Result
    (err, response, body) => {
      callback(null, {
        Temperature: body.currently.temperature,
        Summary: body.currently.summary,
        Icon: body.currently.icon,
      });
    }
  );
};

module.exports = {
  getDarkSky: getDarkSky,
};
