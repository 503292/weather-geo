import './styles.css';
import './spinner.css';

import refs from './js/refs';
import handlerWeather from './js/handlerWeather';
import getGeoPosition from './js/getGeoPosition';

import 'pnotify/dist/PNotifyBrightTheme.css';

import './images/favicon.ico';

refs.searchForm.addEventListener('submit', handlerWeather);
