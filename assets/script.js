$(document).ready(function () {
  var apiKey = "73d3cee72322c512646546f162d5afe5";
  var cities = [];
  var savedCities = JSON.parse(localStorage.getItem("storedCities"));
  console.log(savedCities);
  function retrieveJSON() {
    if (savedCities != null) {
      cities = savedCities;
      for (var i = 0; i < cities.length; i++) {
        //   if (i ==8) {
        //       break;
        //   }
        var button = $("<button>");
        button.attr("class", "city");
        button.attr("data-city", cities[i]);
        button.text(cities[i]);
        $("#citiesButtons").append(button);
      }
      showWeather(savedCities[savedCities.length - 1]);
    } else {
      savedCities = [];
    }
  }
  retrieveJSON();

  function showWeather(city, addCity = false) {
        var queryURL =
         "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
         apiKey;
        $.ajax({
        url: queryURL,
        method: "GET",
        error: function (xhr, status, error) {
         var errorMessage = xhr.status + ": " + xhr.statusText;
            // alert("Error - " + errorMessage);
        console.log(errorMessage)
         },
        success: function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            if (addCity) {
                 $("#citiesButtons").empty();
                 cities.push(city);
                
                for (var i = 0; i < cities.length; i++) {
                  var button = $("<button>");
                  button.attr("class", "city");
                  button.attr("data-city", cities[i]);
                  button.text(cities[i]);
                  $("#citiesButtons").append(button);   
                }
            }

        
     
        
          var queryURL2 =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=minutely,hourly&units=imperial&appid=" +
          apiKey;

        $.ajax({
          url: queryURL2,
          method: "GET",
        }).then(function (response) {
          var uvIndex = response.current.uvi;
          $("#temp").html("Temperature: " + response.current.temp + "  &deg F");
          $("#humidity").html("Humidity: " + response.current.humidity + "%");
          $("#windSpeed").html(
            "Wind Speed: " + response.current.wind_speed + " MPH"
          );
          $("#uvIndex").html("UV Index: " + uvIndex);

          if (uvIndex <= 2) {
            $("#uvIndex").css("background-color", "green");
          } else if (uvIndex >= 3 && uvIndex < 5) {
            $("#uvIndex").css({ "background-color": "yellow", color: "black" });
          } else if (uvIndex >= 6 && uvIndex < 8) {
            $("#uvIndex").css("background-color", "red");
          } else if (uvIndex >= 9) {
            $("#uvIndex").css("background-color", "purple");
          }

          var dailyForecast = new Array();
          for (var i = 1; i < 6; i++) {
            dailyForecast.push({
              temp: response.daily[i].temp.day,
              date: moment(response.daily[i].dt, "X").format("MM/DD/YY"),
              humidity: response.daily[i].humidity,
              icon:
                "https://openweathermap.org/img/wn/" +
                response.daily[i].weather[0].icon +
                ".png",
            });
          }
          var $forecast = $(".card-forecast");

          for (var i = 0; i < dailyForecast.length; i++) {
            var $element = $forecast.eq(i);
            var currentDay = dailyForecast[i];
            $element.find(".card-title").text(currentDay.date);
            $element.find(".icon").attr("src", currentDay.icon);
            $element
              .find(".forecastTemp")
              .html("Temp: " + currentDay.temp + "  &deg F");
            $element
              .find(".forecastHumidity")
              .html("Humidity: " + currentDay.humidity + " %");
          }
          localStorage.setItem("fiveDay", JSON.stringify(dailyForecast));
          console.log(dailyForecast);
        });
        $("#city").html(response.name);
        $("#city").append(" " + moment(response.dt, "X").format("MM/DD/YY"));
        $("#city").append(
          '<img src="https://openweathermap.org/img/wn/' +
            response.weather[0].icon +
            '.png">'
        );
      },
    });
    localStorage.setItem("storedCities", JSON.stringify(cities));
    console.log(cities);
  };
//   function renderButtons() {
//     $("#citiesButtons").empty();
//     $("#cityEntered").empty();

//     for (var i = 0; i < cities.length; i++) {
//       var button = $("<button>");
//       button.attr("class", "city");
//       button.attr("data-city", cities[i]);
//       button.text(cities[i]);
//       $("#citiesButtons").append(button);
//     }
//   }


  $("#weatherCity").on("click", function (event) {
    event.preventDefault();
    // $("#weatherCity").empty();
    var city = $("#cityEntered").val().trim();
    // renderButtons();
    showWeather(city, true);
    
  });

  $(document).on("click", ".city", function (e) {
    showWeather($(this).text());
  });
});
