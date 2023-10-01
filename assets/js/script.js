// var openWeatherApiGeo = "cd4e5584";
const openWeatherApiKey = "17ed7b16ac4a8446e56d5d75fbebccd1";
const currentDay = dayjs().format('DD/MM/YYYY');
const weatherIcon = `http://api.openweathermap.org/img/w/`;

$("#cityBtn").on("click", function handleSearch (event) {
    event.preventDefault();
    console.log("handleSearch working")
    var locationName = $("#cityInput").val();
    $("#cityInput").val("");
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
    fetchWeather(city, latitude, longitude);
}

async function fetchWeather(city, lat, lon){
    console.log("fetchWeather running")
    console.log(lat)
    console.log(lon)
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`);
    console.log(response)
    const data = await response.json();
    console.log("Data below")
    console.log(data);
    let icon = weatherIcon + data.list[0].weather[0].icon + ".png";
    console.log(icon);
    let temperature = data.list[0].main.temp;
    console.log(temperature);
    let wind = data.list[0].wind.speed;
    console.log(wind);
    let humidity = data.list[0].main.humidity;
    console.log(humidity);
    $("#todayName").text(city + " (" + currentDay + ") ");
    $("#todayImage").attr("src", icon);
    $("#todayTemp").text("Temp: " + temperature);
    $("#todayWind").text("Wind: " + wind + " MPH");
    $("#todayHumidity").text("Humidity: " + humidity + "%");

    createForecast(data, temperature, wind, humidity);
}


    function createForecast(data, temperature, wind, humidity) {
        $("#forecast").html("");
        for(let i=1; i< 6; i++){
        console.log(i)
        let nextDay = dayjs().add(i, 'day').format('DD/MM/YYYY');
        let icon = weatherIcon + data.list[i].weather[0].icon + ".png";
        let temperature = data.list[i].main.temp;
        let wind = data.list[i].wind.speed;
        let humidity = data.list[i].main.humidity;
        $("#forecast").append(`
                    <card class="day forecast-card" id="${i}">
                        <ul class="cardContent cardText">
                            <li id="date">${nextDay}</li>
                            <image id="image" src="${icon}"></image><br>
                            <li id="temp">Temp: ${temperature}</li>
                            <li id="wind">Wind: ${wind} MPH</li>
                            <li id="humidity">Humidity: ${humidity} %</li>
                        </ul>
                    </card>`);
    }}

// $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityBeingSearch}&appid=${openWeatherApiKey}`, function () {
        
//         console.log("Hit");
// });


