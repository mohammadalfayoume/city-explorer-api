"use strict";

const express = require("express"); // import express framework
const server = express(); //put every pre defiened methods of express inside server variable
const weatherData = require("./assets/weather.json");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const { application } = require("express");

server.use(cors()); //this allow any client send me a request or make the server opened for any request

// to connect with server we need:
// 1) local IP adress
// 2) PORT

//console.log("Hello") -> it show in termenal for developer
//res.send("Hello") -> it show in web page to user

const PORT = process.env.PORT || 3002;

// test route
// http://localhost:3002/
server.get("/", (req, res) => {
  res.send("Hi from the home route");
});

// http://api.weatherbit.io/v2.0/forecast/daily

const key = process.env.WEATHER_API_KEY;
const key2 = process.env.MOVIES_API_KEY;

server.get("/weather", weatherHandle);
server.get("/movies", moviesHandle);

async function moviesHandle(req, res) {
  let name = req.query.name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key2}&language=en-US&query=${name}&page=1&include_adult=false`;
  let apiResult = await axios.get(url);
  //console.log(apiResult);
  let collectData = apiResult.data.results.map((item) => {
    return new movie(
      item.original_title,
      item.overview,
      item.vote_average,
      item.vote_count,
      item.poster_path,
      item.popularity,
      item.release_date
    );
  });
  //console.log(collectData);
  res.send(collectData);
}
/*

// input > LocationIQ > lat/lon > Weather
//                      input > Movies

handleSubmit = (e)=>{
  let user input =e.target.location.value;
  let locationObject = getlocation(userInput); lat/long arr = [lat,long]
  let weather = getWeatherData(locationObject.lat,locationObject.lon)
  let movies = getMoviesData(userInput);
  this.setState({
    locat,
    weather 
    
  })

}
*/

// http://localhost:3002/weather?city=amman
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
    res.send(collectData);
  } catch {
    let errorObj = {
      error: "Three is an error",
      msg: "Try later please",
    };
    res.send(errorObj);
  }
}

class Weather {
  constructor(item) {
    this.description = `low of ${item.min_temp},  high of ${item.max_temp} with ${item.weather.description}`;
    this.date = item.valid_date;
  }
}
class movie {
  constructor(
    title,
    desc,
    avgVotes,
    totalVotes,
    poster,
    populartiy,
    relaseDate
  ) {
    this.title = title;
    this.overview = desc;
    this.average_votes = avgVotes;
    this.total_votes = totalVotes;
    this.image_url = poster;
    this.popularity = populartiy;
    this.released_on = relaseDate;
  }
}

/*
// server.get("/wheather", (req, res) => {
//   let selectedCity = weatherData.find((item) => {
//     console.log(
//       `${item.lat} == ${req.query.lat} && ${item.lon} == ${req.query.lon} && ${item.city_name} == ${req.query.city}`
//     );
//     if (
//       item.city_name == "" ||
//       item.city_name == undefined ||
//       item.lat == undefined ||
//       item.lon == undefined
//     ) {
//       let err = {
//         error: "Error",
//         msg: "try again",
//       };

//       return err
//     }

//     if (item.city_name == req.query.city) {
//       return item;
//     }
//     if (
//       parseInt(item.lat) == parseInt(req.query.lat) &&
//       parseInt(item.lon) == parseInt(req.query.lon)
//     ) {
//       return item;
//     }
//   });

//   let returnData = selectedCity.data.map((day) => {
//     let specificFormatObj = {
//       description: `low of ${day.low_temp},  high of ${day.max_temp} with ${day.weather.description}`,
//       date: day.valid_date,
//     };
//     return specificFormatObj;
//   });

//   console.log(returnData);
//   res.send(returnData);
// });
*/

server.get("*", (req, res) => {
  res.send("Page not found");
});

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
