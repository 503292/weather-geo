// import getGeoPosition from './getGeoPosition';

const refs = {
  weather: document.querySelector('.weather'),
  icon: document.querySelector('.icon'),
  location: document.querySelector('span[data-field="location"]'),
  temperature: document.querySelector('span[data-field="temp"]'),
  humidity: document.querySelector('span[data-field="humidity"]'),
  wind: document.querySelector('span[data-field="wind"]'),
  conditions: document.querySelector('span[data-field="conditions"]'),
};

export default function createWeather(weather) {
  refs.weather.classList.remove('is-hidden');

  refs.icon.src = 'https:' + weather.current.condition.icon;
  refs.location.textContent = weather.location.name;
  refs.temperature.textContent = weather.current.temp_c + '"';
  refs.humidity.textContent = weather.current.humidity + '%';
  refs.wind.textContent = weather.current.wind_kph + 'kph';
  refs.conditions.textContent = weather.current.condition.text;
}
