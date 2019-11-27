let iconSearch = document.getElementById("search-icon");
let inputSearch = document.getElementById("search-field");

//API Key
let APIKey = "be0f2d303d1fee041a7f61fbcfa5a746";
let momento = document.getElementById("currentDay");
let currentTime = (moment().format('MM/DD/YYYY'));
let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=Evanston&units=imperial&appid=" + APIKey;

let cityArray = [
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
    btn.append([i].cityArray);
    cityList.append(btn);
}
};
city();
// Here we run our AJAX call to the OpenWeatherMap API
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

        // Transfer content to HTML
        $(".city").html(`<h2> ${response.name}—(${currentTime}) </h2>`);
        $(".windspeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
        $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
        $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
        $(".temp_low").text("Low: " + Math.round(response.main.temp_min) + "°F");
        $(".temp_high").text("High: " + Math.round(response.main.temp_max) + "°F");
        $(".uvIndex").text("UV Index: " + response.main.uvIndex);

        // Converts the temp to Kelvin with the below formula
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
    });

