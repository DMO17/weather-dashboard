const currentWeatherCardContainer = $("#current-day-container");
const forecastCardsContainer = $("#forecast-cards-container");
const searchForm = $("#search-form");

const apiKey = "393609ac7b2e5f25ccdd00e626ee13dd";

const renderFormaDate = function (date) {
  return moment.unix(date).format("DD/MM/YYYY");
};

const getCurrentData = function (nameOfCiy, forecastData) {
  return {
    name: nameOfCiy,
    temperature: forecastData.current.temp,
    wind: forecastData.current.wind_speed,
    humidity: forecastData.current.humidity,
    uvi: forecastData.current.uvi,
    date: renderFormaDate(forecastData.current.dt),
    iconCode: forecastData.current.weather[0].icon,
  };
};

const getForecastData = function (forecastData) {
  const callback = function (each) {
    console.log(each);
    return {
      date: renderFormaDate(each.dt),
      temperature: each.temp.max,
      wind: each.wind_speed,
      humidity: each.humidity,
      iconCode: each.weather[0].icon,
    };
  };

  return forecastData.daily.slice(1, 6).map(callback);
};

const getWeatherDataFromApi = async function (cityName) {
  // construct url to get data
  const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  // fetch the data from the api using the constructed url to get current data
  const currentDataResponse = await fetch(currentDataUrl);
  const currentData = await currentDataResponse.json();
  const lat = currentData.coord.lat;
  const lon = currentData.coord.lon;
  const nameOfCiy = currentData.name;

  // construct forecast url
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  // fetch the data from the api using the constructed url to get forecast data
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  //declare the current and forecast data
  const current = getCurrentData(nameOfCiy, forecastData);
  const forecast = getForecastData(forecastData);

  return {
    current: current,
    forecast: forecast,
  };
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
    <ul class="list-group m-3" id="forecast-cards-container">
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

const searchCityName = async function (event) {
  event.preventDefault();

  const userInputValue = $("#city-name");
  const cityName = userInputValue.val();

  if (cityName) {
    // get data from api
    const weatherData = await getWeatherDataFromApi(cityName);

    // render the weather cards
    currentWeatherCardContainer.empty();
    forecastCardsContainer.empty();
    renderAllWeatherCards(weatherData);

    //save city to local storage
  }
};

searchForm.on("submit", searchCityName);
