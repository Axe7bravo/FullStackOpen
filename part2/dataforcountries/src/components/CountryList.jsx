import CountryDetails from './CountryDetails';
import './CountryDetails.css';

const CountryList = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <p className='countries-list'>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.cca3} className='countries-list'>
            {country.name.common} <button onClick={() => showCountry(country)}>show</button>
          </p>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  } else {
    return <p className='countries-list'>No countries found.</p>;
  }
};

export default CountryList;