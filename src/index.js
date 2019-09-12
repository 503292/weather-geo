import './styles.css';

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

import dataTepmlate from './templates/dataTemplate.hbs';

function getGeoPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      maximumAge: 1800000,
    });
  });
}

console.log(getGeoPosition());

// отображение погоды изпользуя геопозицию после разрешения пользователя
getGeoPosition()
  .then(location => `${location.coords.latitude}, ${location.coords.longitude}`)
  .then(data => {
    // console.log(data + ' data');
    PNotify.success({
      text: 'Права доступа до геопозиції надані.',
      delay: 2000,
    });
    return fetchWeather(data);
  })
  .then(weatherData => {
    console.log(weatherData + ' weatherData');
    createWeather(weatherData);
  })
  .catch(error => {
    PNotify.alert({
      text: 'Нет прав доступа к геопозиции, используйте поиск города по имени.',
      delay: 2000,
    });
  });
console.log(getGeoPosition());

// запрос на отображение погоды в заданом регионе через форму поиска по имени города

const refs = {
  weather: document.querySelector('#weather'),
  spinner: document.querySelector('#spinner'),
  searchForm: document.querySelector('.search-form'),
};

function fetchWeather(query) {
  const baseUrl = 'http://api.weatherstack.com';
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const sectionUrl = '/current';
  const access_key = '?access_key=41850987af7b6f6cb6c8cf07660f164d';
  const querySearch = `&query=${query}`;

  return new Promise((resolve, reject) => {
    refs.spinner.classList.remove('is-hidden');
    fetch(proxy + baseUrl + sectionUrl + access_key + querySearch)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(data => {
        console.log(data);
        if (data.error) {
          PNotify.notice({
            title: `${data.error.info}`,
            text: "We didn't find this city, please try again!",
          });
          refs.spinner.classList.add('is-hidden');
          return;
        }
        const htmlData = dataTepmlate(data);
        refs.weather.innerHTML = '';
        refs.weather.classList.remove('is-hidden');
        refs.weather.insertAdjacentHTML('beforeend', htmlData);
        refs.spinner.classList.add('is-hidden');
      })
      .catch(error => console.log(error));
  });
}

function handleWeatherByName(event) {
  event.preventDefault();
  const submitValue = event.currentTarget.city.value;
  console.log(submitValue);

  fetchWeather(submitValue)
    .then(submitData => {
      fetchWeather(submitData);
      event.currentTarget.reset();
      // console.log(submitData);
    })
    .catch(error => {
      PNotify.error({
        text: 'По вашему запросу ничего не найдено! Попробуйте еще)',
        delay: 2000,
      });
    });
}

refs.searchForm.addEventListener('submit', handleWeatherByName);
// https://api.weatherstack.com/current?access_key=2853087b4df2583609d55e22baa8e9e1
