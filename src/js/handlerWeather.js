import fetchWeather from './fetchWeather';

import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

export default function handlerWeather(event) {
  event.preventDefault();
  const submitValue = event.currentTarget.city.value;
  console.log(submitValue);

  fetchWeather(submitValue)
    .then(submitData => {
      fetchWeather(submitData);
      // console.log(submitData);
    })
    .catch(error => {
      PNotify.error({
        text: 'По Вашому запиту нічього не знайдено! Попробуйте ще раз).',
        delay: 2000,
      });
    });
}
