/*
* DISCLAIMER
*
* This code is very bad and may cause severe problems for mental health and eyes.
* I take no responsibility for any issues or damages caused by continuing to read this.
*/
import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({filterChanged, filter}) => {
  return (
    <div>
      find countries<input
        onChange={filterChanged}
        value={filter}
      />
    </div>
  )
}

const Results = ({countries, onClick, setCountry}) => {
  useEffect(() => {
    if (countries.length === 1) {
      setCountry(countries[0])
      return
    }
  })
  if (countries.length > 10) return <p>Too many matches, specify another filter.</p>
  
  
  
  return (
    <>
    {countries.map((country) => {
      return (
        <div key={country.name.official}>
        {country.name.official}
        <button onClick={() => setCountry(country)}>show</button>
        </div>
      )
    })}
    </>
  )

  
}

const Country = ({country}) => {
  if (country === undefined) return
  const languages = []
  for (let key in country.languages) {
    languages.push(country.languages[key])
  }
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={`${country.flags.png}`} alt='Flag of the country' />
      <h2>Weather in {country.capital}</h2>
      <Weather latlng={country.latlng}/>
    </div>

  )
}

const Weather = ({latlng}) => {

  const [weather, setWeather] = useState()

  useEffect(() => {
    axios
    .get(`https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&hourly=temperature_2m,rain,cloudcover`)
    .then((response) => {
      setWeather(response.data)
      console.log('',response.data)
    })
  },[latlng])

  if (weather === undefined) return
  return (
    <div>
      <p>temperature: {weather.hourly.temperature_2m[0]}</p>
      <p>rain: {weather.hourly.rain[0]}mm</p>
      <p>cloud coverage: {weather.hourly.cloudcover[0]}%</p>
    </div>
  )
}

function App() {
  const [country, setCountry] = useState()
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data
          .filter( country => country.name.official.toLowerCase().includes(filter.toLowerCase())))
      })
  }

  useEffect(hook,[filter])

  const filterChanged = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (country) => {
    setCountry(country)
  }

  return (
    <div>
      <Search filterChanged={filterChanged} filter={filter}/>
      <Results countries={countries} onClick={showCountry} setCountry={setCountry}/>
      <Country country={country}/>
    </div>
  );
}

export default App;
