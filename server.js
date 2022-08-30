const express = require("express"); // import express framework
const server = express(); //put every pre defiened methods of express inside server variable
const weatherData = require("./assets/weather.json");
const cors = require("cors");
require("dotenv").config();

server.use(cors()); //this allow any client send me a request or make the server opened for any request

// to connect with server we need:
// 1) local IP adress
// 2) PORT

//console.log("Hello") -> it show in termenal for developer
//res.send("Hello") -> it show in web page to user

const PORT = process.env.PORT;

// http://localhost:3002/
server.get("/", (req, res) => {
  res.send("Hi from the home route");
});

// http://localhost:3002/wheather?lat=lat&lon=lon&city=city
server.get("/wheather", (req, res) => {
  let selectedCity = weatherData.find((item) => {
    console.log(
      `${item.lat} == ${req.query.lat} && ${item.lon} == ${req.query.lon} && ${item.city_name} == ${req.query.city}`
    );
    if (
      item.city_name == "" ||
      item.city_name == undefined ||
      item.lat == undefined ||
      item.lon == undefined
    ) {
      let err = {
        error: "Error",
        msg: "try again",
      };

      return err
    }

    if (item.city_name == req.query.city) {
      return item;
    }
    if (
      parseInt(item.lat) == parseInt(req.query.lat) &&
      parseInt(item.lon) == parseInt(req.query.lon)
    ) {
      return item;
    }
  });

  let returnData = selectedCity.data.map((day) => {
    let specificFormatObj = {
      description: `low of ${day.low_temp},  high of ${day.max_temp} with ${day.weather.description}`,
      date: day.valid_date,
    };
    return specificFormatObj;
  });

  console.log(returnData);
  res.send(returnData);
});

server.get("*", (req, res) => {
  res.send("Page not found");
});

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
