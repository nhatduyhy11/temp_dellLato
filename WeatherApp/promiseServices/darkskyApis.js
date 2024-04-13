const axios = require("axios");
const { config } = require("../config");

const getDarkSky = (lat, lng) => {
  return axios
    .get(`${config.darksky.url}/${config.darksky.key}/${lat},${lng}`)
    .then((res) => {
      //Tự handle error

      return Promise.resolve({
        Temperature: res.data.currently.temperature,
        Summary: res.data.currently.summary,
        Icon: res.data.currently.icon,
      });
    })
    .catch((err) => {
      //Tự handle
      console.log(err);
    });
};

module.exports = {
  getDarkSky,
};
