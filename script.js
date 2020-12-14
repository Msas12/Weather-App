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


// function to call open weather map for info on searched city
function searchCity (input) {
// Sets Variables for Open Weather API
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + ",us" + "&APPID=1d030b0a789179884a5605722b50f289"

// Calls Open Weather API
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

}

// Runs on search button click
$(".search-button").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the City search
    var searchInput = $('.search-input').val().trim();

    // Running the searchCity function(passing in the artist as an argument)
    searchCity(searchInput);
})

//Runs the on click function for Search button if enter pressed
$('.search-input').keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $('.search-button').click();//Trigger search button click event
    }
});

// Pushes clicked saved item through searchCity Function to retrieve info on that city again
$('.list-group-item').on('click', function(){
    var listedCity = $('.list-group-item').text()
    console.log(listedCity)
    searchCity(listedCity)
})

