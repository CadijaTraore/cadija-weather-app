function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10) {
        hours = `0${minutes}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];  
    // to return all the information in the HTML we use template literals
    return `${day} at ${hours}:${minutes}`;
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    //repeating the forecast without using multiple blocks of heavy code 
  
    let forecastHTML = `<div class="row">`;
   //creating a loop for the forecast
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) { 

   // concatenating the strings
   forecastHTML = forecastHTML +  
   `
     <div class="row">
            <div class="col-2"> 
                <div class="weather-forecast-date"> 
                ${day} 
                <img src="https://openweathermap.org/img/wn/01d@2x.png" 
                alt="" 
                width="42"
                class = "sun">
            </br>
            <div class="weather-forecast-temperatures"> 
                <span class="weather-forecast-temperature-max"> 
                    18° </span>
                <span class="weather-forecast-temperature-min"> 12° </span>
            </div>
            </div> 
        </div>
        </div>
        `;
     })    
    forecastElement.innerHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "11fcbbbce878c670c51e166618d82bd1"
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response){

let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.main.temp);

let cityElement = document.querySelector("#city");
cityElement.innerHTML = (response.data.name);

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = (response.data.weather[0].description);

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = (response.data.main.humidity); 
// here, we're saying we want the ID element to get the atributes of the API data we ...
//integrated in the code; to see the path we console log and check the object tree

let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);

let dateElement = document.querySelector("#date");
dateElement.innerHTML =  formatDate(response.data.dt *1000);

let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 // changing the city name accompanied by the right weather icon, we replace the id 02d to the object location//

iconElement.setAttribute("alt", response.data.weather[0].description); // this allows the alternative text image src to change according to the city name when inspectig the element section (not the console)

celsiusTemperature = response.data.main.temp;

getForecast(response.data.coord);

}

function search(city) {
let apiKey = "11fcbbbce878c670c51e166618d82bd1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature); 
}

function handleSubmit(event) {
    event.preventDefault(); // to prevent the page from reloading
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);  // to sent an API call to fetch the data 
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    // removing the celsius class and add it to the Fahrenheit sign 
    celsiusLink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form") // to be able to search a city and get real-time results
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lisbon");
