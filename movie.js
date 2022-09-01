"use strict";
const axios = require("axios");

const key2 = process.env.MOVIES_API_KEY;

const obj = {};
// http://localhost:3002/movies?name=london
async function moviesHandle(req, res) {
  let name = req.query.name;
  console.log("I send a request");

  // console.log(url);

  if (obj[name] !== undefined) {
    console.log("I have a data");

    let apiResult = obj[name];

    res.send(apiResult);
  } else {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key2}&language=en-US&query=${name}&page=1&include_adult=false`;
    console.log("I don't have a data");

    try {
      let apiResult = await axios.get(url);

      let collectData = apiResult.data.results.map((item) => {
        // console.log(item);
        return new movie(item);
      });
      //console.log(collectData);
      obj[name]=collectData
      // console.log(obj);
      res.send(collectData);
    } catch {
      let errorObj = {
        error: "Three is an error",
        msg: "Try later please",
      };
      res.status(404).send(errorObj);
    }
    

  }
  // console.log(obj);
}
class movie {
  /*
      adult: false,
    backdrop_path: '/ohp0ZrioXFTe3v9HyqSiN510DAP.jpg',
    genre_ids: [ 10402, 53 ],
    id: 328483,
    original_language: 'en',
    original_title: 'London Road',
    overview: '',
    popularity: 4.516,
    poster_path: '/rBmD6iNy9YivXUV2oppOm6DFCvJ.jpg',
    release_date: '2015-06-12',
    title: 'London Road',
    video: false,
    vote_average: 6,
    vote_count: 28
    */
  constructor(item) {
    this.title = item.original_title;
    this.overview = item.overview;
    this.average_votes = item.vote_average;
    this.total_votes = item.vote_count;
    this.image_url = item.poster_path;
    this.popularity = item.popularity;
    this.released_on = item.release_date;
  }
}

module.exports = moviesHandle;
