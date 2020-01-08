import './styles.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
const debounce = require('lodash.debounce');

import fetchCountries from './fetchCountries';
import Layout from './Layout';
import countryLayout from './templates/country.hbs';
import countriesLayout from './templates/countries.hbs';

const refs = {
  input: document.querySelector('.js-input'),
  list: document.querySelector('.js-countries-list'),
  counry: document.querySelector('.js-country'),
};

const showCountriesNames = data => {
  refs.list.innerHTML = '';
  const names = data.map(({ name }) => {
    return name;
  });
  Layout.render(countriesLayout, refs.list, names);
  refs.counry.innerHTML = '';
};
//const showCountryDetails = data => {};
const inputHadnler = debounce(e => {
  if (e.target.value === '') {
    refs.list.innerHTML = '';
    return;
  }
  fetchCountries(e.target.value).then(data => {
    if (data.status === 404) {
      PNotify.error({
        title: 'Contry not founded',
        delay: 2000,
      });
      return;
    }
    if (data.length > 10) {
      PNotify.error({
        title: 'Too many matches found.',
        text: 'Please enter a more specific query!',
        delay: 2000,
      });
      return;
    }
    if (data.length === 1) {
      refs.list.innerHTML = '';
      Layout.render(countryLayout, refs.counry, ...data);
      return;
    }
    showCountriesNames(data);
  });
}, 500);

refs.input.addEventListener('keyup', e => {
  inputHadnler(e);
});
