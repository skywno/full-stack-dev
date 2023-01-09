import { useEffect, useState } from "react";
import axios from 'axios'

const Output = (props) => {
  const countries = props.countries
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <div key={country.latlng}>{country.name.common}</div>)}
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h3>Languages</h3>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        <img src={country.flags.png} alt='flag' height='150' />


      </div>
    )
  }

}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesFiltered = countries.filter(country => country.name['common'].toLowerCase().includes(filter))

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Output countries={countriesFiltered} />
    </div>
  );
}

export default App;
