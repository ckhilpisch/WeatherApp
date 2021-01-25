var apiKey = "73d3cee72322c512646546f162d5afe5";
var cities = []

function showWeather () {

var cityName = $("#cityEntered").val().trim();

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  
$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
   
    $.ajax ({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
        var tempF = (response.current.temp-273.15) *1.80 +32;
        $("#temp").html("Temperature: " +tempF.toFixed(2) + "  &deg F");
        $("#humidity").html("Humidity: " + response.current.humidity +"%");
        $("#windSpeed").html("Wind Speed: " + response.current.wind_speed +" MPH");
        $("#uvIndex").html("UV Index: " + response.current.uvi);
    });

    $("#city").html(response.name);

});
};

showWeather();

