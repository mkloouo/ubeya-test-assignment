import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import moment from 'moment';

import { CurrentWeatherData } from './weatherSlice';
import styles from './Weather.module.css';
import { useHooks } from './useHooks';

interface WeatherItemProps {
  weather: CurrentWeatherData;
  isToday?: boolean;
}

const WeatherItem = ({ weather, isToday }: WeatherItemProps) => (
  <div className={styles.row} style={{ border: '1px black solid' }}>
    <span>[icon: {weather.icon}]</span>
    <div className={styles.column}>
      <span>{isToday ? 'Today' : moment(weather.date).format('ddd')}</span>
      <span>{weather.temp}°C</span>
    </div>
  </div>
);

export const Weather = () => {
  const {
    weather,
    isGoogleApiScriptLoaded,
    currentAddress,
    onPlacesChange,
    onPlacesSelect,
    onFetchClick,
  } = useHooks();

  return (
    <div>
      {weather && (
        <>
          {weather.forecast && weather.forecast.length > 0 && (
            <div className={styles.row}>
              {weather.forecast.map((item) => (
                <WeatherItem
                  key={item.description + item.date}
                  weather={item}
                />
              ))}
            </div>
          )}
          {weather.current && (
            <WeatherItem weather={weather.current} isToday={true} />
          )}
          {weather.current?.description && (
            <div className={styles.row}>
              <span>{weather.current.description}</span>
            </div>
          )}
        </>
      )}
      {isGoogleApiScriptLoaded && (
        <div className={styles.row}>
          <PlacesAutocomplete
            value={currentAddress}
            onChange={onPlacesChange}
            onSelect={onPlacesSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  aria-label="Choose city"
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <button className={styles.button} onClick={onFetchClick}>
            Get Weather
          </button>
        </div>
      )}
    </div>
  );
};

Weather.displayName = 'Weather';
