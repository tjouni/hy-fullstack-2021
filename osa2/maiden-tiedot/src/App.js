import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital, weather }) => {
  return (
    <div>
      <h3>weather in {capital}</h3>
      <p>
        <b>temperature: </b>
        {weather.temperature} Celsius
      </p>
      {weather.weather_icons.map((icon, i) => (
        <img src={icon} alt={weather.weather_descriptions[i]} key={icon} />
      ))}
      <p>
        <b>wind: </b>
        {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(process.env);
  useEffect(() => {
    console.log("effect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, [country.capital, apiKey]);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="250" alt={country.name} />
      {weather.current && (
        <Weather capital={country.capital} weather={weather.current} />
      )}
    </div>
  );
};

const Countries = ({ countries, setSearchTerm }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return (
      <div>
        {countries.map((country, i) => (
          <p key={country.name}>
            {country.name}{" "}
            <button onClick={() => setSearchTerm(country.name)}>show</button>
          </p>
        ))}
      </div>
    );
  }
};

const Filter = ({ handleSearchTermChange, searchTerm }) => {
  return (
    <div>
      find countries:
      <input onChange={handleSearchTermChange} value={searchTerm} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const visibleCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Filter
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
      />
      <Countries countries={visibleCountries} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default App;
