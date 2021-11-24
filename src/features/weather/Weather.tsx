import React, { useCallback, useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getCurrentWeatherAsync,
  selectCity,
  selectWeather,
  setCity,
} from './weatherSlice';
import styles from './Weather.module.css';

export const Weather = () => {
  const city = useAppSelector(selectCity);
  const weather = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();
  const [currentCity, setCurrentCity] = useState(city);

  const onChooseCityChange = useCallback((e) => {
    setCurrentCity(e.target.value);
  }, []);

  const onFetchClick = useCallback(() => {
    if (
      currentCity === null ||
      currentCity === undefined ||
      currentCity.length === 0
    ) {
      return alert('Invalid input: Enter city name');
    }

    dispatch(setCity(currentCity));
    dispatch(getCurrentWeatherAsync(city));
  }, [dispatch, currentCity, city]);

  return (
    <div>
      {weather && (
        <>
          <div className={styles.row}>
            <span>
              Current temperature in {city} is{' '}
              {weather.temp && weather.temp > 0
                ? '+' + weather.temp
                : weather.temp}{' '}
              Celcius.
            </span>
          </div>
          <div className={styles.row}>
            <span>
              More general description would be: {weather.description}.
            </span>
          </div>
        </>
      )}
      <div className={styles.row}>
        <input
          className={styles.textbox}
          autoComplete="address-level2"
          aria-label="Choose city"
          value={currentCity}
          onChange={onChooseCityChange}
        />
        <button className={styles.button} onClick={onFetchClick}>
          Get Weather
        </button>
      </div>
    </div>
  );
};

Weather.displayName = 'Weather';
