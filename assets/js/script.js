// var openWeatherApiGeo = "cd4e5584";
const openWeatherApiKey = "17ed7b16ac4a8446e56d5d75fbebccd1";

$("#cityBtn").on("click", function handleSearch (event) {
    event.preventDefault();
    console.log("handleSearch working")
    var locationName = $("#cityInput").val();
    $("#cityInput").val("");
    determineLatLon(locationName);
    });

async function determineLatLon (city) {
    console.log("determinLatLon running")
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
}
// $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityBeingSearch}&appid=${openWeatherApiKey}`, function () {
        
//         console.log("Hit");
// });


for(let i=0; i< 40; i+=20){
    console.log(i)
}