// var openWeatherApiGeo = "cd4e5584";
const openWeatherApiKey = "17ed7b16ac4a8446e56d5d75fbebccd1";
currentDay = dayjs().format('DD/MM/YYYY');

$("#cityBtn").on("click", function handleSearch (event) {
    event.preventDefault();
    console.log("handleSearch working")
    var locationName = $("#cityInput").val();
    $("#cityInput").val("");
    $("#todayName").text(locationName + " (" + currentDay + ")");
    determineLatLon(locationName);
    });

async function determineLatLon (city) {
    console.log("determineLatLon running")
// console.log("Hit");
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${openWeatherApiKey}`);
    console.log(response)
    const data = await response.json();
    console.log("Data below")
    console.log(data);
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    fetchWeather(latitude, longitude);
}

async function fetchWeather(lat, lon){
    console.log("fetchWeather running")
    console.log(lat)
    console.log(lon)
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`);
    console.log(response)
    const data = await response.json();
    console.log("Data below")
    console.log(data);
    let temperature = data.list[0].main.temp;
    console.log(temperature);
    let wind = data.list[0].wind.speed;
    console.log(wind);
    let humidity = data.list[0].main.humidity;
    console.log(humidity);
    $("#todayTemp").text("Temp: " + temperature);
    $("#todayWind").text("Wind: " + wind + " MPH");
    $("#todayHumidity").text("Humidity: " + humidity + "%");

    createForecast(temperature, wind, humidity);
}


    function createForecast(temperature, wind, humidity) {for(let i=0; i< 6; i++){
        console.log(i)
    }}

// $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityBeingSearch}&appid=${openWeatherApiKey}`, function () {
        
//         console.log("Hit");
// });


