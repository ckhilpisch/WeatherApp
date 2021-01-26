var apiKey = "73d3cee72322c512646546f162d5afe5";
var cities = [];
var temp = (".temp");
var todaysDate = moment().format('LL');
$("#todayDate").html(todaysDate);
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
        // create a rendering of daily data here
        // // tracing where the extra days data is
        // console.log(response.daily[0].temp.day);
        // console.log(response.daily[0].humidity);
        // console.log(response.daily[0].weather[0].icon);
        // var unix_date = response.daily[0].dt
        // var date = moment(unix_date, "X");
        // console.log(date.format("MM/DD/YY"));
        // var foreDate = [];
        // var foreTemp = [];
        // var foreHumid = [];
        // var foreIcon = [];
        
        // function dailyTemp() {
        //     for (i =0; i < 5; i++) {
        //         var dailyTemp = response.daily[i].temp.day
        //         foreTemp.push(dailyTemp);
        //     }
        // }
        // function dailyDate() {
        //     for (i =0; i < 5; i++) {
        //         var unix_date = response.daily[i].dt;
        //         var date = moment(unix_date, "X").format("MM/DD/YY");
        //         foreDate.push(date);
        //     }
        // }
        // function dailyHumid() {
        //     for (i =0; i < 5; i++) {
        //         var dailyHumid = response.daily[i].humidity;
        //         foreHumid.push(dailyHumid);
        //     }
        // }
        // function dailyIcon() {
        //     for (i =0; i < 5; i++) {
        //         var dailyIcon = response.daily[i].weather[0].icon;
        //         foreIcon.push(dailyIcon);
        //     }
        // }

        // dailyTemp();
        // dailyDate();
        // dailyHumid();
        // dailyIcon();

        // took the above code and moved all of it into an array
        // var iconUrl ="http://openweathermap.org/img/wn/" + icon[i] + ".png";
        
        var dailyForecast = new Array ();
        for (var i = 0; i < 5; i++) {
            dailyForecast.push({
                temp : response.daily[i].temp.day,
                date : moment((response.daily[i].dt), "X").format("MM/DD/YY"),
                humidity : response.daily[i].humidity, 
                icon : "https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png",});
        }
        
        // console.log(dailyForecast);
        var $forecast = $(".card-forecast");

        for (var i = 0; i < dailyForecast.length; i++) {
        var $element = $forecast.eq(i);
        var currentDay = dailyForecast[i];
        $element.find(".card-title").text(currentDay.date);
        $element.find(".icon").attr("src", currentDay.icon);
        $element.find(".forecastTemp").html("Temp: " + currentDay.temp +"  &deg F" );
        $element.find(".forecastHumidity").html("Humidity: " + currentDay.humidity + " %");


    // TODO : Edit additional elements here...
}

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