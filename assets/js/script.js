const currentWeatherCardContainer = $("#current-day-container");

const renderCurrentWeatherCard = function (currentData) {
  //construct the weather cards dynamically
  const weatherCardHTMLCode = `<div class="card-title h1"> ${currentData.name} ${currentData.date}
  <img src="https://openweathermap.org/img/w/${currentData.iconCode}.png" /></div>
  <p class="card-text">Temp:${currentData.temperature} &#8457;</p>
  <p class="card-text">Wind:${currentData.wind} MPH</p>
  <p class="card-text">Humidity:${currentData.humidity} %</p>
  <p class="card-text">
    UV index:
    <span class="bg-success text-white px-3 py-1">${currentData.uvi}</span>
  </p>`;

  //append the constructed weather cards to its container
  currentWeatherCardContainer.append(weatherCardHTMLCode);
};

const onReady = function () {};

$(document).ready(onReady);
