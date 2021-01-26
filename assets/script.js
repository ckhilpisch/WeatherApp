var apiKey = "73d3cee72322c512646546f162d5afe5";
var cities = []
function showWeather () {
    city = $("#cityEntered").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  
$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=" + apiKey;
   
    $.ajax ({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
        
        $("#temp").html("Temperature: " + response.current.temp +"  &deg F");
        $("#humidity").html("Humidity: " + response.current.humidity +"%");
        $("#windSpeed").html("Wind Speed: " + response.current.wind_speed +" MPH");
        $("#uvIndex").html("UV Index: " + response.current.uvi);
        console.log(queryURL2);

        // // tracing where the extra days data is
        // console.log(response.daily[0].temp.day);
        // console.log(response.daily[0].humidity);
        // console.log(response.daily[0].weather[0].icon);
        // var unix_date = response.daily[0].dt
        // var date = moment(unix_date, "X");
        // console.log(date.format("MM/DD/YY"));
    });
    $("#city").html(response.name);
});

};

// create a function so that the buttons of each city chosen render on the page
function renderButtons() {
    $("#citiesButtons").empty();
    for (var i = 0; i < cities.length; i++) {

      var button = $("<button>");
      button.attr("class", "city");
      button.attr("data-city", cities[i]);
      button.text(cities[i]);

      $("#citiesButtons").append(button);

    }
  }

$("#weatherCity").on("click", function(event) {
    event.preventDefault();

var city = $("#cityEntered").val().trim();
  renderButtons ();
  cities.push(city);
  showWeather();

});

$(document).on("click", ".city", showWeather)
renderButtons();