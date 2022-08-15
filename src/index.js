function currentTime(timeStemp)
let li = document.querySelector("#current-hour");
let currentTime = new Date(timeStemp);
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${day} ${hours}: ${minutes}`;

function displayWeatherNow(response) {
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#other").innerHTML = response.data.weather[0].main;
}
function find(event) {
  event.preventDefault();

  let apiKey = "f58fc7cca90e018da558c0c544af64a8";
  let city = document.querySelector("#search-another").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherNow);
}
let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", find);

function searchLocation(position) {
  let apiKey = "f58fc7cca90e018da558c0c544af64a8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherNow);
}
function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrent);
