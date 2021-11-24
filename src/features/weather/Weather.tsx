import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getCurrentWeatherAsync,
  selectCity,
  selectWeather,
} from './weatherSlice';
import styles from './Weather.module.css';

export const Weather = () => {
  const defaultCity = useAppSelector(selectCity);
  const weather = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();
  const [city, setCity] = useState(defaultCity);

  return (
    <div>
      {weather && (
        <>
          <div className={styles.row}>
            <span>
              Current temperature in {city} is {weather.temp} Celcius.
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
          aria-label="Choose city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(getCurrentWeatherAsync(city))}
        >
          Fetch
        </button>
      </div>
    </div>
  );
};

Weather.displayName = 'Weather';
