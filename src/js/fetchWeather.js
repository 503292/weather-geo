import refs from './refs';
import dataTepmlate from '../templates/dataTemplate.hbs';

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
        //   console.log(data);
        if (data.error) {
          PNotify.notice({
            title: `${data.error.info}`,
            text: 'Ми не найшли цього міста, попробуйте ще раз!',
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

export default fetchWeather;
