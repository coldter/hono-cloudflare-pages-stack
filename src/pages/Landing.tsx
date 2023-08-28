import '../styles/pages/Landing.css';
import { InferResponseType } from 'hono';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { RiSearchLine, RiDropFill } from 'react-icons/ri';
import { WiCloudy, WiStrongWind } from 'react-icons/wi';
import { appSearchClient, appWeatherDataClient } from '../service/service.client';
import backgroundImageMap from '../assets/images/backgrounds/';
import { MotionBox } from '../components/MotionBox';
import { LocationContext } from '../contexts/LocationContext';
import { DebounceInput } from 'react-debounce-input';
import { DefaultWeatherData } from '../data';
import { capitalizeString } from '../utils/helpers';

export default function Landing() {
  const $getSearch = appSearchClient.api.search.$get;
  const $getWeather = appWeatherDataClient.api.weather.$get;

  const [valid, setValid] = useState(true);
  const [city, setCity] = useState<string>();
  const [results, setResults] = useState<InferResponseType<typeof $getSearch>>();
  const [data, setData] = useState<InferResponseType<typeof $getWeather>>(DefaultWeatherData);

  const { location, setLocation } = useContext(LocationContext);

  useEffect(() => {
    if (!location) {
      getLocation();
    } else {
      handleCityByCordinates(location.lat, location.lng);
    }
  }, []);
  let background = backgroundImageMap.dayBg;

  /**
   * @description
   * @param lat
   * @param lon
   */
  async function handleCityByCordinates(lat: number, lon: number) {
    try {
      const response = await $getWeather({ query: { lat, lon } });
      if (!response.ok) {
        throw new Error('Error getting data');
      }
      const responseData = await response.json();
      setData(responseData);
      setValid(true);
    } catch (error) {
      console.error('🧯 🔥 ~ handleCityByCordinates ~ error', error);
      // alert('Error getting data');
    }
  }
  /**
   * @description
   * @param value
   */
  async function handleChangeValue(value: string) {
    if (value.length < 3) {
      return;
    }
    try {
      setCity(value);
      const response = await $getSearch({ query: { q: value || '' } });
      if (!response.ok) {
        throw new Error('Error getting data');
      }
      const responseData = await response.json();
      setResults(responseData);
      setValid(true);
    } catch (error) {
      console.error('🧯 🔥 ~ handleChangeValue ~ error', error);
      setValid(false);
      alert('Error getting data');
    }
  }
  /**
   * @description
   * @param e
   */
  async function handleCity(e: FormEvent) {
    e.preventDefault();
    if (!city || city.length < 3) {
      return;
    }
    try {
      const response = await $getWeather({ query: { q: city || '' } });

      if (!response.ok) {
        throw new Error('Error getting data');
      }

      const responseData = await response.json();
      if (responseData.name !== '-') {
        setValid(true);
      }
      setData(responseData);
    } catch (error) {
      console.error('🧯 🔥 ~ handleCity ~ error', error);
      setValid(false);
      alert('Error getting data');
    }
  }
  /**
   * @description
   */
  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude,
        });

        handleCityByCordinates(latitude, longitude);
      });
    } else {
      alert('Browser does not support geolocation');
    }
  }

  return (
    <>
      <div id="main">
        <div className="background">
          <img src={background} alt="Wallpaper" className="img-background" />
        </div>
        <div className="main-grid">
          <div className="app-name">
            {/* // TODO: Fix this */}
            <img src={''} alt="AppIcon" />
          </div>
          <MotionBox>
            <div className="content">
              <div className="principal">
                <div className="header">
                  <form onSubmit={handleCity}>
                    {/* Get current location */}
                    <div className="extras">
                      <div className="get-location" onClick={getLocation}>
                        <span className="get-location-button">My Location</span>
                      </div>
                      {!valid && <span className="snackbar">Invalid city!</span>}
                    </div>

                    <div className="input-wrapper">
                      <DebounceInput
                        placeholder="Enter a city name"
                        type="text"
                        name="city"
                        value={city}
                        onChange={(event) => {
                          handleChangeValue(event.target.value);
                        }}
                        className="cityInput"
                        autoComplete="off"
                        debounceTimeout={500}
                      />

                      <div className="search-results">
                        {results &&
                          results.list.map((result) => {
                            const country = result.sys.country;
                            const flag = `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${country.toLowerCase()}.png`;

                            return (
                              <div
                                key={result.coord.lat}
                                className="result-item"
                                onClick={() =>
                                  handleCityByCordinates(result.coord.lat, result.coord.lon)
                                }
                              >
                                <img className="result-flag" src={flag} alt="flag" />
                                <p>
                                  <span className="result-city">{result.name}</span>, {country}
                                </p>
                              </div>
                            );
                          })}
                      </div>

                      <button type="submit" className="searchButton">
                        <RiSearchLine />
                      </button>
                    </div>
                  </form>
                </div>
                <div className="result">
                  {/* // TODO: Fix this */}
                  {/* <img src={icon} alt="icon" className="weather-icon" /> */}
                  <h1 className="temperature">
                    {data?.main.temp.toFixed(0)}
                    <span>ºC</span>
                  </h1>
                  <span className="description">
                    {capitalizeString(data?.weather[0].description)}
                  </span>
                  <span className="local">
                    {`${data?.name}, ${data?.sys.country}`}&nbsp;&nbsp;
                    {data?.sys.country !== '-' && (
                      <img
                        src={`https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${data?.sys.country.toLowerCase()}.png`}
                        alt="country"
                      />
                    )}
                  </span>
                </div>

                <div className="other-results">
                  <div className="other">
                    Thermal sensation:
                    <br />
                    <span>{data?.main.feels_like.toFixed(1)} ºC</span>
                  </div>
                  <div className="other">
                    Temp. Minimum: <br />
                    <span>{data?.main.temp_min.toFixed(1)} ºC</span>
                  </div>
                  <div className="other">
                    Maximum temperature: <br />
                    <span>{data?.main.temp_max.toFixed(1)} ºC</span>
                  </div>
                </div>
              </div>

              <div className="secondary">
                <div className="secondary-results">
                  <div className="other-secondary-results">
                    <div className="icon-secondary-results humidity">
                      <RiDropFill />
                    </div>
                    <p>
                      Moisture:
                      <br />
                      {data?.main.humidity}%
                    </p>
                  </div>

                  <div className="other-secondary-results">
                    <div className="icon-secondary-results">
                      <WiStrongWind />
                    </div>
                    <p>
                      Wind:
                      <br />
                      {data?.wind.speed.toFixed(1)} m/s
                    </p>
                  </div>

                  <div className="other-secondary-results">
                    <div className="icon-secondary-results">
                      <WiCloudy />
                    </div>
                    <p>
                      Clouds: <br />
                      {data?.clouds.all}%
                    </p>
                  </div>
                </div>
                {/* <div className="landing-figure">
                  <img src={''} alt="Landing" />
                </div> */}
                {data?.name !== '-' && (
                  <div className="go-maps">
                    <a
                      href={`https://www.google.com/maps/@${data?.coord.lat},${data?.coord.lon},12z`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open location in Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>
          </MotionBox>
        </div>
      </div>
    </>
  );
}
