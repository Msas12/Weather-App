var cityList = []

function findListedCity(c) {
  for (var i = 0; i < cityList.length; i++) {
    if (c.toUpperCase() === cityList[i].toUpperCase()) {
      return true;
    }
  }
  return false;
}


// Function to call openweathermap for info on searched city
function searchCityWeather (input) {
// Sets Variables for Open Weather API
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + ",us" + "&units=imperial" + "&APPID=1d030b0a789179884a5605722b50f289"

// Calls Openweathermap API - Current Weatehr
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);


    // Set the temps to variables
    var tempF = response.main.temp
    var tempFFeelsLike = response.main.temp_min

    // Adds Weather Icon to a variable
    const dayZeroIcon = (`http://openweathermap.org/img/w/${response.weather[0].icon}.png`)

   // Transfer Content to HTML Main Dashboard
    $(".city").html("<h4>" + response.name + " (" + (moment().utc().format("MMM Do")) + ")" + "</h4>")
    $(".description").html("<h5>" + response.weather[0].main + (`<i><img src="${dayZeroIcon}" alt="Weather Icon"></i>`) + "<h5>")
    $(".tempF").html("Temp: " + tempF.toFixed(2) + '<span>&#176; F</span>');
    $(".feelsLike").html("Feels Like: " + tempFFeelsLike.toFixed(0) + '<span>&#176;</span>')
    $(".wind").text("Wind Speed: " + response.wind.speed + " mph")
    $(".humidity").text("Humidity: " + response.main.humidity + "%")

    var lat = response.coord.lat
    var lon = response.coord.lon
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon+ "&units=imperial" + "&APPID=1d030b0a789179884a5605722b50f289"

    // Calls Openweather API OneCall
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      //Gets info for current date
      // var date = 
      
      // Pulls info and sets color for UV Index 
      var uvi = response.daily[0].uvi
      var uviEl = $('.uvi')

      uviEl.text(`UV Index: ${uvi}`)

      if (uvi <= 2) {
        console.log(uvi)
        uviEl.css('color', 'green')
      }else if (uvi>=6) {
        uviEl.css('color', 'red')
      }else {
        uviEl.css('color', 'orange')
      }

    });

  });

}

// Function to call openweathermap for 5 Day forcast on searched city
function searchCityForecast (input) {
    // Sets Variables for Open Weather API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + ",us" +  "&units=imperial" + "&APPID=1d030b0a789179884a5605722b50f289"
    
    // Calls Open Weather API
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response)

        // Set forecast section of for each day to variables
        var dayOneBlock = response.list[2]
        var dayTwoBlock = response.list[10]
        var dayThreeBlock = response.list[18]
        var dayFourBlock = response.list[26]
        var dayFiveBlock = response.list[34]

        // Date to display on each forecast day
        var dateOneText = moment(dayOneBlock.dt_txt).format("M/D")
        var dateTwoText = moment(dayTwoBlock.dt_txt).format("M/D")
        var dateThreeText = moment(dayThreeBlock.dt_txt).format("M/D")
        var dateFourText = moment(dayFourBlock.dt_txt).format("M/D")
        var dateFiveText = moment(dayFiveBlock.dt_txt).format("M/D")

        // Setting weather icon's for each forecast day to a variable
        var dayOneIcon = (`http://openweathermap.org/img/w/${dayOneBlock.weather[0].icon}.png`)
        var dayTwoIcon = (`http://openweathermap.org/img/w/${dayTwoBlock.weather[0].icon}.png`)
        var dayThreeIcon = (`http://openweathermap.org/img/w/${dayThreeBlock.weather[0].icon}.png`)
        var dayFourIcon = (`http://openweathermap.org/img/w/${dayFourBlock.weather[0].icon}.png`)
        var dayFiveIcon = (`http://openweathermap.org/img/w/${dayFiveBlock.weather[0].icon}.png`)



        // Day 1 forecast card info
        $('#dayOne').html("<h5>" + dateOneText + "</h5>")
        $('#dayOne').append(`<p>${dayOneBlock.weather[0].main}<i><img src="${dayOneIcon}" alt="Weather Icon"></i><p>`)
        $('#dayOne').append("<p>Temp: " + (dayOneBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayOne').append("<p>Wind Speed: " + dayOneBlock.wind.speed + " mph</p>")
        $('#dayOne').append("<p>Humidity: " + dayOneBlock.main.humidity + "%</p>")

        // Day 2 forecast card info
        $('#dayTwo').html("<h5>" + dateTwoText + "</h5>")
        $('#dayTwo').append(`<p>${dayTwoBlock.weather[0].main}<i><img src="${dayTwoIcon}" alt="Weather Icon"></i><p>`)
        $('#dayTwo').append("<p>Temp: " + (dayTwoBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayTwo').append("<p>Wind Speed: " + dayTwoBlock.wind.speed + " mph</p>")
        $('#dayTwo').append("<p>Humidity: " + dayTwoBlock.main.humidity + "%</p>")

        // Day 3 forecast card info
        $('#dayThree').html("<h5>" + dateThreeText + "</h5>")
        $('#dayThree').append(`<p>${dayThreeBlock.weather[0].main}<i><img src="${dayThreeIcon}" alt="Weather Icon"></i><p>`)
        $('#dayThree').append("<p>Temp: " + (dayThreeBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayThree').append("<p>Wind Speed: " + dayThreeBlock.wind.speed + " mph</p>")
        $('#dayThree').append("<p>Humidity: " + dayThreeBlock.main.humidity + "%</p>")

        // Day 4 forecast card info
        $('#dayFour').html("<h5>" + dateFourText + "</h5>")
        $('#dayFour').append(`<p>${dayFourBlock.weather[0].main}<i><img src="${dayFourIcon}" alt="Weather Icon"></i><p>`)
        $('#dayFour').append("<p>Temp: " + (dayFourBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayFour').append("<p>Wind Speed: " + dayFourBlock.wind.speed + " mph</p>")
        $('#dayFour').append("<p>Humidity: " + dayFourBlock.main.humidity + "%</p>")

        // Day 5 forecast card info
        $('#dayFive').html("<h5>" + dateFiveText + "</h5>")
        $('#dayFive').append(`<p>${dayThreeBlock.weather[0].main}<i><img src="${dayFiveIcon}" alt="Weather Icon"></i><p>`)
        $('#dayFive').append("<p>Temp: " + (dayFiveBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayFive').append("<p>Wind Speed: " + dayFiveBlock.wind.speed + " mph</p>")
        $('#dayFive').append("<p>Humidity: " + dayFiveBlock.main.humidity + "%</p>")

      });

}

// Runs on search button click
$(".search-button").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the City search
    var searchInput = $('.search-input').val().toUpperCase().trim();
    
    // If State is listed already do not list
    if (findListedCity(searchInput)) {
      return;
    }

    var cityButton = $('<button>').addClass("btn btn-outline-secondary list-group-item")
    var addButton = cityButton.text(searchInput)
    $('.list-group').append(addButton)
    
    cityList.push(searchInput)
    localStorage.setItem("cities", JSON.stringify(cityList))
    console.log(cityList)

    // Running the searchCity function(passing in the city input as an argument)
    $('#main-body').removeClass('d-none')
    searchCityWeather(searchInput)
    searchCityForecast(searchInput)

    // Adds clear all button ONLY if it's not already there
    if ($('.list-group').children().length == 1) {
    // Adds a Clear all button to the bottom of searched list
    var clearButton = $(`<a type="button" class="clear-button mt-3 btn btn-danger">Clear All&nbsp;<i class="fas fa-times-circle"></i></a>`)

    clearButton.addClass("list-group-item")
    $('.list-group').after(clearButton)


    }
})

//Runs the on click function for Search button if enter pressed
$('.search-input').keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $('.search-button').click();//Trigger search button click event
    }
});

// Pushes clicked saved item through searchCity Function to retrieve info on that city again
$(document).on('click', '.list-group-item', function(event){
  if (event.target.classList.contains("clear-button")) {
    clearHistory(event)
    return;
  }

    var listedCity = $(this).text()
    console.log(listedCity)
    
    $('#main-body').removeClass('d-none')
    searchCityWeather(listedCity)
    searchCityForecast(listedCity)
    

})

function getSavedCities() {
  var savedCities = JSON.parse(localStorage.getItem('cities'))
  console.log(savedCities)

  if (savedCities !== null) {
    cityList = savedCities

    // Display saved Cities in list
    for (var i=0; i<cityList.length; i++) {
      var cityButton = $('<button>').addClass("btn btn-outline-secondary list-group-item")
      var addButton = cityButton.text(cityList[i])
      $('.list-group').append(addButton)

      searchCityWeather(cityList[i])
      searchCityForecast(cityList[i])
    }
    // Adds a Clear all button to the bottom of searched list
    var clearButton = $(`<a type="button" class="clear-button mt-3 btn btn-danger">Clear All&nbsp;<i class="fas fa-times-circle"></i></a>`)

    clearButton.addClass("list-group-item")
    $('.list-group').after(clearButton)
  }

}

// Function to clear Item Saved City from List and Local storage
getSavedCities()

//clear search history
function clearHistory(event) {
  event.preventDefault();
  stateList = [];
  localStorage.removeItem("cities");
  document.location.reload();
}