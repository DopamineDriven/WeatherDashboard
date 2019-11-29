let iconSearch = document.getElementById("search-icon");
let inputSearch = document.getElementById("search-field");

//API Key
let APIKey = "be0f2d303d1fee041a7f61fbcfa5a746";
let momento = document.getElementById("currentDay");
let currentTime = (moment().format('MM/DD/YYYY'));
let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=Evanston&units=imperial&appid=${APIKey}`;

//retrieving geolocation
let geocoder;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  console.log(lat, lng)

    $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${APIKey}`,
    method: "GET"
})
// We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

        $(".city").html(`<h2> ${response.name}—${currentTime} </h2>`);
        $(".windspeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
        $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
        $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
        $(".temp_low").text("Low: " + Math.round(response.main.temp_min) + "°F");
        $(".temp_high").text("High: " + Math.round(response.main.temp_max) + "°F");

    });
}
function errorFunction(){
    alert("Geocoder failed");
}

function searchBar () {
let queryParams = `api-key: ${APIKey}`;

//establishing query params to incorporate search bar functionality into dashboard

queryParams.q = $("#search-terms")
.val()
.trim();
let returnedResults = queryURL+$.param(queryParams);
return returnedResults
};

searchBar();

const cityArray = [
    "Austin",
    "Chicago",
    "New York",
    "Orlando",
    "San Francisco",
    "Seattle",
    "Denver",
    "Atlanta"
];

let cityList = document.getElementById("cityList");
function city () {
for (let i = 0; i < cityArray.length; i++) {
    let btn = document.createElement("button");
    btn.setAttribute("id", cityArray[i]);
    btn.onclick = (e) => buttonClick( e.target.id);
    btn.append(cityArray[i]);
    cityList.append(btn);
}
};
city();
// Here we run our AJAX call to the OpenWeatherMap API

const cityInfo = async (city) => {

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    const response = await fetch(queryURL);
    const result = await response.json();
    return result;

};

const buttonClick = (city) => {

cityInfo(city).then(response =>{console.log("info =>",response) 

         // Transfer content to HTML
         $(".city").html(`<h2> ${response.name}—${currentTime} </h2>`);
         $(".windspeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
         $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
         $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
         $(".temp_low").text("Low: " + Math.round(response.main.temp_min) + "°F");
         $(".temp_high").text("High: " + Math.round(response.main.temp_max) + "°F");
} );

}

/*

$.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
        let uvi=("http://api.openweathermap.org/data/2.5/uvi?" +
        "q=Evanston&units=imperial&appid=" + APIKey);
        // Transfer content to HTML
        $(".city").html(`<h2> ${response.name}—(${currentTime}) </h2>`);
        $(".windspeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
        $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
        $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
        $(".temp_low").text("Low: " + Math.round(response.main.temp_min) + "°F");
        $(".temp_high").text("High: " + Math.round(response.main.temp_max) + "°F");
        $(".uvIndex").text("UV Index: " + response.uvi);

        // Converts the temp to Kelvin with the below formula
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
    });
*/

    //Need to get users geolocation to load current weather conditions in their area
    //below is sample code from W3 schools
    //must use openweathermap.org api to retrieve geolocation specific weather as a function of local coordinates via geolocation
    //must use openweathermap.org api to retrieve 5-day forecast as a function of local coordinates via geolocation
    //must use openweathermap.org api to retrieve current and 5-day outlook as a function of city name via a search bar
    //link to 5-day forecast api https://openweathermap.org/forecast5
    //link to current forecast api https://openweathermap.org/current
    //geolocation snippet below
    //<script>
/*var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
</script> */

