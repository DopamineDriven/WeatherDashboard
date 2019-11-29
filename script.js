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

  //run AJAX call
    $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${APIKey}`,
    method: "GET"
    })
//store all retrieved data inside of an object called "response"
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

//creating an array of city names
const cityArray = [
    "Atlanta",
    "Austin",
    "Chicago",
    "Denver",
    "New York",
    "Orlando",
    "San Francisco",
    "Seattle"
];

//creating city function to cycle through cityArray elements and retrieve city data upon click event
let cityList = document.getElementById("cityList");
function city () {
for (let i = 0; i < cityArray.length; i++) {
    let btn = document.createElement("tr");
    btn.setAttribute("id", cityArray[i]);
    btn.onclick = (e) => buttonClick( e.target.id);
    btn.append(cityArray[i]);
    cityList.append(btn);
}
};
city();
// run AJAX call to OpenWeatherMap API

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

/*  //must use openweathermap.org api to retrieve 5-day forecast as a function of local coordinates via geolocation
    //must use openweathermap.org api to retrieve current and 5-day outlook as a function of city name via search bar or button widgets
    //link to 5-day forecast api https://openweathermap.org/forecast5
    //link to current forecast api https://openweathermap.org/current
    //<script>*/

