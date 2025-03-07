import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import Filter from './components/Filter';
import './AppStyle.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAllCountries().then((data) => {
      setAllCountries(data);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredCountries = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCountries(filteredCountries);
      setSelectedCountry(null);
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [searchQuery, allCountries]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
    setCountries([country]); 
  };

  return (
    <div className="app-container">
      <div className="search-container" >
        <Filter searchTerm={searchQuery} handleSearchChange={handleSearchChange} />
      </div>
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList countries={countries} showCountry={showCountryDetails} />
      )}
    </div>
  );
}

export default App;