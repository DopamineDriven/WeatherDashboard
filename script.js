//API Key
//this global keypress function overrides styling interference with linking search form and search button functionality
$("#search-terms").keypress(function(e){
    if(e.which == 13) {
        $("#search-btn").click();
    }
});
//APIKey unique to open weather account
let APIKey = "be0f2d303d1fee041a7f61fbcfa5a746";
let momento = document.getElementById("currentDay");
let currentTime = (moment().format('MM/DD/YYYY'));

//This function uses longitutde and lattitude data to retrieve UV Index info for a given city
function cityUV(lon, lat) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`,
        method: "GET"
    })
        .then(function (response1) {

            $(".uvIndex").html("UV Index: " + `<span class=" badge badge-danger">${(response1.value)}</span>`);
        });
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

//ajax call for five-day forecast
function fiveDayForecast(city) {
    let weatherurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    console.log(weatherurl);
    $.ajax({
        url: weatherurl,
        type: "GET",
    })
        .then(function (response2) {
            //empties and repopulates the five day forecast each time a new city is searched
            $("#5-day-forecast").empty();
            //j is used for iterating date for the five day forecast
            let j=0
            //response2 is an array of 40 elements [0]-[39]
            for (let i = 4; i < 40;) {
                console.log(response2)
                console.log(i);
                let temp = response2.list[i].main.temp;
                let humidity = response2.list[i].main.humidity;
                let date = moment().add(j, 'days').format('l');
                let icon = response2.list[i].weather[0].icon;
                let iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
                //dynamically generating HTML elements for five-day forecast 
                let currentCondition = $("<div></div>");
                let card = $("<div></div>");
                card.addClass("card mb-2 bg-primary text-white");
                let cardBody = $("<div></div>");
                cardBody.addClass("card-body 5-day");
                let d8 = $(`<p><strong>${date}</strong></p>`);
                cardBody.append(d8);
                let divImage = $(`<div><img src="${iconurl}" /></div>`);
                cardBody.append(divImage)
                let pTemp = $("<p>" + Math.round(temp) + "°F</p>");
                cardBody.append(pTemp);
                let pHumidity = $("<p>" + Math.round(humidity) + "% Humidity</p>")
                cardBody.append(pHumidity)
                card.append(cardBody)
                currentCondition.append(card);
                $("#5-day-forecast").append(currentCondition[0]);
                //iterates i every 8th element from 4 on (4, 12, 20, 28, 36); these elements contain weather for noon each day
                i+=8;
                //j++ iterates through the DD date (12/05-12/09)
                ++j;
            }
        });
};

/*
function fiveDayForecast(city) {
	let weatherurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
	console.log(weatherurl);
	$.ajax({
		url: weatherurl,
		type: 'GET'
	}).then(function (response2) {
		//empties and repopulates the five day forecast each time a new city is searched
		$('#5-day-forecast').empty();
		//j is used for iterating date for the five day forecast
		let j = 0;
		let k = 0;
        //response2 is an array of 40 elements [0]-[39]
		for (let i = 4; i < 40; ) {
			console.log('response 2', response2);
			console.log(i);
            for (k < 40; k+=3;) {
                const timeConvert = moment()
                    .add(response2.list[k].dt)
                    .format('dddd, MMMM Do, YYYY h:mm:ss A');
                console.log('comverting time', timeConvert);
                console.log('convert time', response2.list[k].dt);
            }
			const temp_max = response2.list[i].main.temp_max;
			const temp_min = response2.list[i].main.temp_min;
			let humidity = response2.list[i].main.humidity;
			let date = moment().add(j, 'days').format('l');
			let icon = response2.list[i].weather[0].icon;
			let iconurl = 'https://openweathermap.org/img/w/' + icon + '.png';
			//dynamically generating HTML elements for five-day forecast
			let currentCondition = $('<div></div>');
			let card = $('<div></div>');
			card.addClass('card mb-2 bg-primary text-white');
			let cardBody = $('<div></div>');
			cardBody.addClass('card-body 5-day');
			let d8 = $(`<p><strong>${date}</strong></p>`);
			cardBody.append(d8);
			let divImage = $(`<div><img src="${iconurl}" /></div>`);
			cardBody.append(divImage);
			let pTemp = $('<p>High: ' + Math.round(temp_max) + '°F</p>');
			let pLow = $('<p>Low: ' + Math.round(temp_min) + '°F</p>');
			cardBody.append(pTemp);
			cardBody.append(pLow);
			let pHumidity = $('<p>' + Math.round(humidity) + '% Humidity</p>');
			cardBody.append(pHumidity);
			card.append(cardBody);
			currentCondition.append(card);
			$('#5-day-forecast').append(currentCondition[0]);
			//iterates i every 8th element from 4 on (4, 12, 20, 28, 36); these elements contain weather for noon each day
			i += 8;
			//j++ iterates through the DD date (12/05-12/09)
			j++;
		}
	});
}
*/


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
        .then(function (response) {
            updateLocation(response);
        });
    cityUV(lng, lat);
};

function updateLocation(response) {
    const windDeg = Math.round(response.wind.deg);
    const toDirection = degToCompass(windDeg);
    console.log(toDirection);
    $(".city").html(`<h2>${response.name} (${currentTime}) <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png"></h2>`);
    $(".windspeed").text("Wind: " + toDirection + " at " + Math.round(response.wind.speed) + " mph");
    $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
    $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
    $(".temp_low").text("Low: " + Math.round(response.main.temp_min) + "°F");
    $(".temp_high").text("High: " + Math.round(response.main.temp_max) + "°F");
    $(".real_feel").text("Feels Like: " + Math.round(response.main.feels_like) + "°F");

    fiveDayForecast(response.name);
}

function errorFunction() {
    alert("Geocoder failed");
}
//This empty array parses weather-search-terms key from local storage to have previously searched cities loaded upon refreshing the page

//This is the function for the search-term form and appended search button; this is the city search bar
function inputSearch() {

    $("#search-btn").click(function (event) {
        //this event prevents default refreshing of the page upon button click
        event.preventDefault(console.log("click"))
        let ciudad = $("#search-terms").val().trim();
        console.log(ciudad);
        cityArray.push(ciudad);
        if (ciudad != '') {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=imperial&appid=${APIKey}`,
                method: "GET"
            }).then(function (response) {
                updateLocation(response);
                cityUV(response.coord.lon, response.coord.lat)
                $("#cityList").empty();
                localStorage.setItem("weather-search-terms", JSON.stringify(cityArray));
                let savedCities = JSON.parse(localStorage.getItem("weather-search-terms"));
                console.log(savedCities)
                setupCityListBox(savedCities);
            });
        }
    })
};

inputSearch();

//creating city function to cycle through cityArray elements and retrieve city data upon click event
let cityList = document.getElementById("cityList");
let cityArray = JSON.parse(localStorage.getItem("weather-search-terms"));
if (cityArray&&cityArray!==null) 
{
    setupCityListBox(cityArray);
} else {
    cityArray=[];
    setupCityListBox(cityArray);
}
function setupCityListBox(cityArray) {
    for (let i = 0; i < cityArray.length; i++) {
        let btn = document.createElement("button");
        btn.setAttribute("id", cityArray[i]);
        btn.classList = "btn btn-outline-dark ";
        btn.onclick = (e) => buttonClick(e.target.id);
        btn.append(cityArray[i]);
        cityList.append(btn);

    }
};

const cityInfo = async (city) => {

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    const response = await fetch(queryURL);
    const result = await response.json();
    return result;

};

const buttonClick = (city) => {

    cityInfo(city).then(response => {
        console.log("info =>", response)
        // Transfer content to HTML
        updateLocation(response);
        cityUV(response.coord.lon, response.coord.lat);
    });


};