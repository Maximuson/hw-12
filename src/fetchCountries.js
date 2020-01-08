const fetchCountries = searchQuery => {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
      return err;
    });
};

export default fetchCountries;
