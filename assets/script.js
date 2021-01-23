// API call for one city/current weather: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//API call for one city, 5 days forecast api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// API key for the uv index (requires lat and long)
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


var apiKey = "73d3cee72322c512646546f162d5afe5"
var cityName = "Minneapolis"
var lat = "";
var long = "";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?"+ lat + "&" + lon + "&exclude=minutely, hourly, daily&appid=" + apiKey;

var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;


console.log(queryURL);
console.log(queryURL2);