//API Key
let APIKey = "be0f2d303d1fee041a7f61fbcfa5a746";
let momento = document.getElementById("currentDay");
let currentTime = (moment().format('MM/DD/YYYY'));

function cityUV (lon, lat) {
    let uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`;
    $.ajax({
        url: uvURL,
        method: "GET"
    })
    .then(function(response1) {

        $(".uvIndex").text(`UV Index: ${response1.value}`);
    });
};


function fiveDayForecast (city) {
    let weatherurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    console.log(weatherurl);
    $.ajax({
        url: weatherurl,
        type: "GET"
        })
        .then(function(response2) {

            //empties and repopulates the five day forecast each time a new city is searched
            $("#5-day-forecast").empty();
            for (let i=0; i<5; i++) {
                let temp = response2.list[i].main.temp;
                let humidity = response2.list[i].main.humidity;
                let date = moment().add(i,"days").format('l'); 
                let icon = response2.list[i].weather[0].icon;
                let iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
                let currentCondition = $("<div></div>");
                currentCondition.addClass("col-sm currentCondition");
                let card = $("<div></div>");
                card.addClass("card");
                let cardBody = $("<div></div>");
                cardBody.addClass("card-body 5-day");
                let d8 = $(`<p><strong>${date}</strong></p>`);
                cardBody.append(d8);
                let divImage = $(`<div><img src="${iconurl}" /></div>`);
                cardBody.append(divImage)
                let pTemp = $("<p>"+Math.round(temp)+"°F</p>");
                cardBody.append(pTemp);
                let pHumidity = $("<p>"+Math.round(humidity)+"% Humidity</p>")
                cardBody.append(pHumidity)
                card.append(cardBody)
                currentCondition.append(card);
                $("#5-day-forecast").append(currentCondition[0]);
            }
            console.log(response2);
    });
};

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
  let geoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${APIKey}`;
  //run AJAX call
    $.ajax({
    url: geoURL,
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
        cityUV (lng, lat);
};
//If user declines to enable geolocation or geocoder fails an error message is generated
function errorFunction(){
    alert("Geocoder failed");
}

function inputSearch () {

$("#search-btn").click(function (event) {
    event.preventDefault(console.log("click"))
    let ciudad=$("#search-terms").val().trim();
    console.log(ciudad);
    cityArray.push(ciudad);
    let buttonURL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=imperial&appid=${APIKey}`;
    if (ciudad != '') {
    $.ajax({
        url: buttonURL,
        method: "GET"
    })
    .then(function(response) {

        $(".city").html(`<h2> ${response.name}—${currentTime} </h2>`);
        $(".windspeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
        $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
        $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
        $(".temp_low").text("Low: " + Math.round(response.main.temp_min) + "°F");
        $(".temp_high").text("High: " + Math.round(response.main.temp_max) + "°F");
        cityUV (response.coord.lon, response.coord.lat);
        fiveDayForecast(ciudad);
        $("#cityList").empty();
        setupCityListBox();
    });
}
})
};

inputSearch();
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
function setupCityListBox () {
for (let i = 0; i < cityArray.length; i++) {
    let btn = document.createElement("tr");
    btn.setAttribute("id", cityArray[i]);
    btn.onclick = (e) => buttonClick( e.target.id);
    btn.append(cityArray[i]);
    cityList.append(btn);  
    }
};
setupCityListBox();

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
    cityUV (response.coord.lon, response.coord.lat);
    fiveDayForecast(city);
});
};