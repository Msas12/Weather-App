// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://ip-geo-location.p.rapidapi.com/ip/23.123.12.11?format=json",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "d7c407139dmsh3168e98d3071accp1df2d1jsncf860db85460",
// 		"x-rapidapi-host": "ip-geo-location.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response1) {
// 	console.log(response1);
// });

var cityList = []


// Function to call openweathermap for info on searched city
function searchCityWeather (input) {
// Sets Variables for Open Weather API
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + ",us" + "&units=imperial" + "&APPID=1d030b0a789179884a5605722b50f289"

// Calls Open Weather API
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);


    // Set the temps to variables
    var tempF = response.main.temp
    var tempFFeelsLike = response.main.temp_min

    // Transfer Content to HTML
    // Adds Weather Icon next to City Name
    const dayZeroIcon = (`http://openweathermap.org/img/w/${response.weather[0].icon}.png`)
    $(".city").html("<h4>" + response.name + (`<i><img src="${dayZeroIcon}" alt="Weather Icon"></i>`) + "</h4>");
    //$(".city").html(`<h4>${response.name}<i><img src="${dayZeroIcon}" alt="Weather Icon"></i></h4>`);
    $(".tempF").html("Temp: " + tempF.toFixed(2) + '<span>&#176;</span>');
    $(".feelsLike").html("Feels Like: " + tempFFeelsLike.toFixed(0) + '<span>&#176;</span>');
    $(".wind").text("Wind Speed: " + response.wind.speed + " mph");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");

  });

}

// Function to call openweathermap for 5 Day forcast on searched city
function searchCityForecast (input) {
    // Sets Variables for Open Weather API
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + ",us" +  "&units=imperial" + "&APPID=1d030b0a789179884a5605722b50f289"
    
    // Calls Open Weather API
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        const dayOneBlock = response.list[2];
        // console.log(dayOneBlock);
        const dayTwoBlock = response.list[10];
        // console.log(dayTwoBlock);
        const dayThreeBlock = response.list[18];
        // console.log(dayThreeBlock);
        const dayFourBlock = response.list[26];
        // console.log(dayFourBlock);
        const dayFiveBlock = response.list[34];
        // console.log(dayFiveBlock);

      });

}

// Runs on search button click
$(".search-button").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the City search
    var searchInput = $('.search-input').val().toUpperCase().trim();
    var cityButton = $('<button>').addClass("btn btn-outline-secondary list-group-item")
    var addButton = cityButton.text(searchInput)
    $('.list-group').append(addButton)

    cityList.push(searchInput)
    localStorage.setItem("cities", JSON.stringify(cityList))
    console.log(cityList)

    // Running the searchCity function(passing in the artist as an argument)
    searchCityWeather(searchInput)
    searchCityForecast(searchInput)
})

//Runs the on click function for Search button if enter pressed
$('.search-input').keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $('.search-button').click();//Trigger search button click event
    }
});

// Pushes clicked saved item through searchCity Function to retrieve info on that city again
$(document).on('click', '.list-group-item', function(){
    var listedCity = $(this).text()
    console.log(listedCity)
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
    }
  }

}

getSavedCities()