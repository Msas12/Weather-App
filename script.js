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
    $(".city").html("<h4>" + response.name + (`<i><img src="${dayZeroIcon}" alt="Weather Icon"></i>`) + "</h4>")
    $(".tempF").html("Temp: " + tempF.toFixed(2) + '<span>&#176; F</span>');
    $(".feelsLike").html("Feels Like: " + tempFFeelsLike.toFixed(0) + '<span>&#176;</span>')
    $(".wind").text("Wind Speed: " + response.wind.speed + " mph")
    $(".humidity").text("Humidity: " + response.main.humidity + "%")

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
        console.log(response)

        // $('#dayOne').epmty()
        // $('#dayTwo').epmty()
        // $('#dayThree').epmty()
        // $('#dayFour').epmty()
        // $('#dayFive').epmty()

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
        $('#dayOne').append("<h5>" + dateOneText + "</h5>")
        $('#dayOne').append(`<i><img src="${dayOneIcon}" alt="Weather Icon"></i>`)
        $('#dayOne').append("<p>Temp: " + (dayOneBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayOne').append("<p>Humidity: " + dayOneBlock.main.humidity + "%</p>")

        // Day 2 forecast card info
        $('#dayTwo').append("<h5>" + dateTwoText + "</h5>")
        $('#dayTwo').append(`<i><img src="${dayTwoIcon}" alt="Weather Icon"></i>`)
        $('#dayTwo').append("<p>Temp: " + (dayTwoBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayTwo').append("<p>Humidity: " + dayTwoBlock.main.humidity + "%</p>")

        // Day 3 forecast card info
        $('#dayThree').append("<h5>" + dateThreeText + "</h5>")
        $('#dayThree').append(`<i><img src="${dayThreeIcon}" alt="Weather Icon"></i>`)
        $('#dayThree').append("<p>Temp: " + (dayThreeBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayThree').append("<p>Humidity: " + dayThreeBlock.main.humidity + "%</p>")

        // Day 4 forecast card info
        $('#dayFour').append("<h5>" + dateFourText + "</h5>")
        $('#dayFour').append(`<i><img src="${dayFourIcon}" alt="Weather Icon"></i>`)
        $('#dayFour').append("<p>Temp: " + (dayFourBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayFour').append("<p>Humidity: " + dayFourBlock.main.humidity + "%</p>")

        // Day 5 forecast card info
        $('#dayFive').append("<h5>" + dateFiveText + "</h5>")
        $('#dayFive').append(`<i><img src="${dayFiveIcon}" alt="Weather Icon"></i>`)
        $('#dayFive').append("<p>Temp: " + (dayFiveBlock.main.temp).toFixed(0) + " &deg;F</p>")
        $('#dayFive').append("<p>Humidity: " + dayFiveBlock.main.humidity + "%</p>")

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

    // Running the searchCity function(passing in the city input as an argument)
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