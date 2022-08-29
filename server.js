const express = require("express"); // import express framework
const server = express(); //put every pre defiened methods of express inside server variable
const wheatherData = require("./assets/weather.json");
const cors = require("cors");
require("dotenv").config();

server.use(cors()); //this allow any client send me a request or make the server opened for any request

// to connect with server we need:
// 1) local IP adress
// 2) PORT

//console.log("Hello") -> it show in termenal for developer
//res.send("Hello") -> it show in web page to user

const PORT = process.env.PORT;

// http://localhost:3000/
server.get("/", (req, res) => {
  res.send("Hi from the home route");
});

// http://localhost:3000/wheather?lat=lat&lon=lon&city=city
// server.get("/wheather", (req, res) => {
//   let selectedCity = wheatherData.find((city) => {
//     console.log(
//       `${city.lat} == ${req.query.lat} && ${city.lon} == ${req.query.lon} && ${city.city_name} == ${req.query.city}`
//     );

//     if (city.city_name == req.query.city_name) {
//       return city;
//     } else if (
//       parseInt(city.lat) == parseInt(req.query.lat) &&
//       parseInt(city.lon) == parseInt(req.query.lon)
//     ) {
//       return city;
//     } else {
//       return "not found";
//     }
//   });
//   res.send(selectedCity);
// });

server.get("/wheather", (req, res) => {
  let selectedCityName = wheatherData.find((item) => {
    console.log(`${item.city_name} == ${req.query.city}`);
    if (item.city_name == req.query.city) {
      return item;
    }
    else {
        return 'not found'
      }
  });
  res.send(selectedCityName);
});

server.get("/wheather", (req, res) => {
    let selectedLatAndLon = wheatherData.find((item) => {
      console.log(`${item.lat} == ${req.query.lat} && ${item.lon} == ${req.query.lon}`);
      if (item.lat == req.query.lat && item.lon == req.query.lon) {
        return item;
      }
      else {
        return 'not found'
      }
    });
    res.send(selectedLatAndLon);
  });

server.get("*", (req, res) => {
  res.send("Page not found");
});

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
