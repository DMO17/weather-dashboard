const mockData = {
  current: {
    name: "London",
    temperature: 123.45,
    wind: 111.22,
    humidity: 33,
    uvi: 2.5,
    date: "(3/30/2021)",
    iconCode: "04n",
  },
  forecast: [
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 7777,
      humidity: 33,
      iconCode: "04n",
    },
  ],
};

const currentWeatherCardContainer = $("#current-day-container");
const forecastCardsContainer = $("#forecast-cards-container");

const apiKey = "393609ac7b2e5f25ccdd00e626ee13dd";

const getWeatherDataFromApi = async function (cityName) {
  // construct url to get data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  // fetch the data from the api using the constructed url
  const response = await fetch(url);
  const data = await response.json();
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const nameOfCiy = data.name;

  // construct forecast url
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  console.log(forecastUrl);
};

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

const renderForecastWeatherCard = function (forecastData) {
  const constructAndAppendForecastCards = function (each) {
    const forecastCardsHTML = `
    <ul class="list-group m-2" id="forecast-cards-container">
    <li class="list-group-item disabled bg-primary text-white">
    ${each.date}
  </li>
  <li class="list-group-item"> <img src="https://openweathermap.org/img/w/${each.iconCode}.png"</li>
  <li class="list-group-item">Temp: ${each.temperature} &#8457;</li>
  <li class="list-group-item">Wind: ${each.wind} MPH</li>
  <li class="list-group-item">Humidity:${each.humidity} %</li>
  </ul>`;

    forecastCardsContainer.append(forecastCardsHTML);
  };

  forecastData.map(constructAndAppendForecastCards);
};

const renderAllWeatherCards = function (weatherData) {
  renderCurrentWeatherCard(weatherData.current);

  renderForecastWeatherCard(weatherData.forecast);
};
const onReady = function () {
  renderAllWeatherCards(mockData);
  getWeatherDataFromApi("Birmingham");
};

$(document).ready(onReady);
