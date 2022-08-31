'use strict'
const axios = require("axios");

const key2 = process.env.MOVIES_API_KEY;


// http://localhost:3002/movies?name=london
async function moviesHandle(req, res) {
    let name = req.query.name;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key2}&language=en-US&query=${name}&page=1&include_adult=false`;
    // console.log(url);
  
    try {
      let apiResult = await axios.get(url);
      //console.log(apiResult);
      let collectData = apiResult.data.results.map((item) => {
        console.log(item);
        return new movie(item);
      });
      //console.log(collectData);
      res.send(collectData);
    } catch {
      let errorObj = {
        error: "Three is an error",
        msg: "Try later please",
      };
      res.status(404).send(errorObj);
    }
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

  module.exports=moviesHandle