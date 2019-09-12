import fetchWeather from './fetchWeather';

import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

// Показувати погоду використовуючи геодані, після надання доступу юзером
function getGeoPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      maximumAge: 1800000,
    });
  });
}

getGeoPosition()
  .then(location => `${location.coords.latitude}, ${location.coords.longitude}`)
  .then(data => {
    // console.log(data + ' data');
    PNotify.success({
      text: 'Права доступа до геоданих надані!',
      delay: 2000,
    });
    return fetchWeather(data);
  })
  .then(weatherData => {
    // console.log(weatherData + ' weatherData');
    createWeather(weatherData);
  })
  .catch(error => {
    PNotify.alert({
      text:
        'Сайт не має доступу до геоданих, використайте пошук по імені міста.',
      delay: 2000,
    });
  });

export default getGeoPosition;
