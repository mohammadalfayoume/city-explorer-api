const weatherData = require("./assets/weather.json");
// const axios = require("axios");


async function handleweather(req, res) {
  const city = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;
//const url=`http://localhost:3002/weather1?searchQuery=${city}&lat=${lat}&lon=${lon}`;

  try {
    let cityData = weatherData.find((item) => {
        console.log(`${item.city_name}==${req.query.searchQuery} && ${item.lat==req.query.lat} && ${item.lon==req.query.lon}`);
        
        if(item.city_name.toLowerCase()==city.toLowerCase() && item.lat==lat && item.lon==lon) {
            return item
        } 
        if (item.lat==lat && item.lon==lon){
            return item
        }
        if (item.city_name.toLowerCase() == city.toLowerCase()){
            return item
        }
    });
    let returnData = cityData.data.map((day) => {
           let specificFormatObj = {
               description: `low of ${day.low_temp},  high of ${day.max_temp} with ${day.weather.description}`,
               date: day.valid_date,
             };
             return specificFormatObj;
           });
    console.log(returnData);
    res.send(returnData);
  } catch {}


}

module.exports= handleweather
