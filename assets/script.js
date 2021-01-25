// API call for one city/current weather: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//API call for one city, 5 days forecast api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// API key for the uv index (requires lat and long)
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var apiKey = "73d3cee72322c512646546f162d5afe5";
var cityName = "minneapolis";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
// var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

// console.log(queryURL);
// console.log(queryURL2);
// console.log(queryURL3);

$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response){
   // code for intial information response
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    console.log(lat);
    console.log(lon);
    
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    
    $.ajax ({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
    
        // code for the UV index response
        // console logging to find appropriate information
        // console.log(response);
        // console.log(response.current.temp);
        // console.log(response.current.humidity);
        // console.log(response.current.wind_speed);
        // console.log(response.current.uvi);
        var tempF = (response.current.temp-273.15) *1.80 +32;

        $("#temp").html("Temperature: " +tempF);
        $("#humidity").html("Humidity: " + response.current.humidity);
        $("#windSpeed").html("Wind Speed: " + response.current.wind_speed);
        $("#uvIndex").html("UV Index: " + response.current.uvi);


    
    });

});