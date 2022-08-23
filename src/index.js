function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}
{
  function displayForecast(response) {
    console.log(response.data.daily);

    let forecastElement = document.querySelector("#forecast");
    let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
    let forecastHTML = `<div class="row">`;

    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="https://pngimg.com/uploads/sun/sun_PNG13427.png"
                alt=""
                width="29"
              />
              <div class="weather-forecast-temeratures">
                <span class="weather-forecast-temp-max">18°</span>
                <span class="weather-forecast-temp-min">12°</span>
                </div>
              </div>
    `;
    });

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
  }
}
function getForecast(cordinates) {
  console.log(cordinates);
  let apiKey = "f58fc7cca90e018da558c0c544af64a8";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayWeatherNow(response) {
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
