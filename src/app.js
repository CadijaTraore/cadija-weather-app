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
}

function search(city) {
let apiKey = "11fcbbbce878c670c51e166618d82bd1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature); 
}

function handleSubmit(event) {
    event.preventDefault(); // to prevent the page from reloading
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    // to sent an API call to fetch the data 
}

search("Lisbon");


let form = document.querySelector("#search-form") // to be able to search a city and get real-time results
form.addEventListener("submit", handleSubmit);