// "https://api.openweathermap.org/data/2.5/weather?q=taipei&appid=4de5c587cd78a4fe1914b6485bb3b7d4&units=metric"
const apiKey = "4de5c587cd78a4fe1914b6485bb3b7d4"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

let show_weather = false;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector("temp");
const card = document.querySelector('.card');
let weather_condition;

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}` + `&units=metric`);
    var data = await response.json();

    if (response.status == 404)
    {
        document.querySelector(".message").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        show_weather = false;
    }
    else {
        show_weather = true;
        document.querySelector(".message").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
        weather_condition = data.weather[0].main;

        // update the weather image
        const imgsrc = "images/"+weather_condition.toLowerCase()+".png";
        weatherIcon.src = imgsrc;
    
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    checkWeather(searchBox.value);
  }
});