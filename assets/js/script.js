// var openWeatherApiGeo = "cd4e5584";
const openWeatherApiKey = "17ed7b16ac4a8446e56d5d75fbebccd1";
const currentDay = dayjs().format('DD/MM/YYYY');
const weatherIcon = `https://api.openweathermap.org/img/w/`;
const formerSearchesList = JSON.parse(localStorage.getItem("formerSearches")) || [];

$("#cityBtn").on("click", async function handleSearch (event) {
    event.preventDefault();
    console.log("handleSearch working")
    var locationName = $("#cityInput").val();
    $("#cityInput").val("");
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&appid=${openWeatherApiKey}`);
    const data = await response.json();
    console.log(data);
    if (data.length > 0) {
        determineLatLon(locationName);
        saveToLocalStorage(locationName);
    } else {
        alert("Invalid response you doo doo head dummy!!")
        location.reload()
    }
    });

async function determineLatLon (city) {
    console.log("determineLatLon running")
// console.log("Hit");
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${openWeatherApiKey}`);
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

    createForecast(data);
}

function createForecast(data) {
    console.log("createForecast running")
    $("#forecast").html("");
    for(let i=1; i< 6; i++){
        console.log(i)
        let nextDay = dayjs().add(i, 'day').format('DD/MM/YYYY');
        let icon = weatherIcon + data.list[i].weather[0].icon + ".png";
        let temperature = data.list[i].main.temp;
        let wind = data.list[i].wind.speed;
        let humidity = data.list[i].main.humidity;
        $("#forecast").append(`
                    <card class="day forecast-card" id="card${i}">
                        <ul class="cardContent cardText">
                            <li id="date${i}">${nextDay}</li>
                            <image id="image${i}" src="${icon}"></image><br>
                            <li id="temp${i}">Temp: ${temperature}</li>
                            <li id="wind${i}">Wind: ${wind} MPH</li>
                            <li id="humidity${i}">Humidity: ${humidity} %</li>
                        </ul>
                    </card>`);
                    if (i === 5) {
                        $("#card5").addClass("secretBtn")
                        eventListenerDeveloper ();
                    }
    }
    
}

function eventListenerDeveloper () {
    $(".secretBtn").off("click", clickityClick);
    $(".secretBtn").on("click", clickityClick);
};

function saveToLocalStorage(city) {
    console.log("saveToLocalStorage running")
    if (!formerSearchesList.includes(city)) {
        formerSearchesList.push(city);
        formerSearchesList.sort();
        // var cityInput = $("#cityInput").val();
        // var siblingId = $("#cityBtn").attr('class');
        // parseInt(siblingId);
        console.log(cityInput);
        // console.log(siblingId);
        localStorage.setItem("formerSearches", JSON.stringify(formerSearchesList));
        // console.log(localStorage.getItem(siblingId));
        console.log(JSON.parse(localStorage.getItem(formerSearchesList)));
    }
        getFromLocalStorage();
}

function getFromLocalStorage() {
    console.log("getFromLocalStorage running")
    $("#history").html("");

    var formerSearches = JSON.parse(localStorage.getItem('formerSearches')) || [];

    formerSearches.forEach(function(val) {
        var button = `<button class="pastCitiesBtn">${val}</button>`
        $('#history').append(button);
    });

};

$('#history').on('click', '.pastCitiesBtn', function() {
    var value = $(this).text();

    determineLatLon(value);
})



function clickityClick() {
    console.log("clickityClick working")
    var colorChange = ["1", "2", "3", "4", "5", "6", "7"];
    var colorChosen1 = Math.floor(Math.random() * colorChange.length) + 1;
    toString(colorChosen1);
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").removeClass("colorChange1");
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").removeClass("colorChange2");
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").removeClass("colorChange3");
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").removeClass("colorChange4");
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").removeClass("colorChange5");
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").removeClass("colorChange6");
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").removeClass("colorChange7");
    $("#todayName, #todayTemp, #todayWind, #todayHumidity").addClass("colorChange" + colorChosen1);
    // console.log(colorChosen);
    
    var colorChosen2 = Math.floor(Math.random() * colorChange.length) + 1;
    toString(colorChosen2);
    $("#date1, #temp1, #wind1, #humidity1").removeClass();
    $("#date1, #temp1, #wind1, #humidity1").addClass("colorChange" + colorChosen2);
    
    var colorChosen3 = Math.floor(Math.random() * colorChange.length) + 1;
    toString(colorChosen3);
    $("#date2, #temp2, #wind2, #humidity2").removeClass();
    $("#date2, #temp2, #wind2, #humidity2").addClass("colorChange" + colorChosen3);
    
    var colorChosen4 = Math.floor(Math.random() * colorChange.length) + 1;
    toString(colorChosen4);
    $("#date3, #temp3, #wind3, #humidity3").removeClass();
    $("#date3, #temp3, #wind3, #humidity3").addClass("colorChange" + colorChosen4);
    
    var colorChosen5 = Math.floor(Math.random() * colorChange.length) + 1;
    toString(colorChosen5);
    $("#date4, #temp4, #wind4, #humidity4").removeClass();
    $("#date4, #temp4, #wind4, #humidity4").addClass("colorChange" + colorChosen5);
    
    var colorChosen6 = Math.floor(Math.random() * colorChange.length) + 1;
    toString(colorChosen6);
    $("#date5, #temp5, #wind5, #humidity5").removeClass();
    $("#date5, #temp5, #wind5, #humidity5").addClass("colorChange" + colorChosen2);
};

$(".secretBtn").on("click", clickityClick);

$('#clearBtn').on('click', function clearLocalStorage(event) {
    event.preventDefault();
    console.log("clearLocalStorage working");
    // localStorage.removeItem(formerSearches);
    // location.reload;
    localStorage.clear();
    location.reload()
})


getFromLocalStorage();