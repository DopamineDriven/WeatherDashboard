# WeatherDashboard
# Unit 06 Server-Side APIs Homework: Weather Dashboard


## About

- This weather dashboard uses geolocation to derive the users current coordinates and load the current weather and five day forecast data accordingly.
- There is a local storage functionality that populates an empty array located beneath the search entry form.
- Local storage used so that when a user refreshes the page it will retrieve recently searched cities from local storage.
- The five day forecast is retrieved from an API containing 40 elements [0]-[39]
- The temperature and weather icon is retrieved from the 5th element (midday) and iterates i+=8 so that midday is retrieved for each of the five days.
- This app uses OpenWeather APIs to retrieve current and forecast weather data.

## User benefits

This app stores any recently searched city in local storage. By doing so even after closing the webpage and/or refreshing the user still has recently searched city in local storage.
It is also quite useful if the user is lost or uncertain which part of town they are in. This app uses geolocation to access user coordinates and informs the user which city they are currently located in.
The information for the current forecast is displayed as follows:
- City-Date-Icon image (visual representation of current conditions)
- Temperature
- Low Temperature
- High Temperature
- Humidity
- Wind Speed
- UV Index

The informaton displayed for the five-day forecast is as follows:
- Date (MM/DD/YYYY)
- Icon image
- Temperature
- Humidity
Note: this data is representative of conditions at noon each day (used i=4; i+=8 to iterate through the elements containing weather for noon)