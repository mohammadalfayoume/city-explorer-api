
'use strict'
const axios = require("axios");


const key = process.env.WEATHER_API_KEY;


async function weatherHandle(req, res) {
    const cityName = req.query.city;
    console.log(cityName);
  
    const URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&city=${cityName}`;
    console.log(URL);
  
    try {
      let apiResult = await axios.get(URL);
      let collectData = apiResult.data.data.map((item) => {
        return new Weather(item);
      });
      console.log(collectData);
      res.status(200).send(collectData);
    } catch {
      let errorObj = {
        error: "Three is an error",
        msg: "Try later please",
      };
      res.status(404).send(errorObj);
    }
  }
  
  class Weather {
    constructor(item) {
      this.description = `low of ${item.min_temp},  high of ${item.max_temp} with ${item.weather.description}`;
      this.date = item.valid_date;
    }
  }

  module.exports=weatherHandle