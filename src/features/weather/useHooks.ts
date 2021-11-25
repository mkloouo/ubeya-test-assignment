import { useCallback, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { config } from '../../config';
import { DEFAULT_CITY } from '../../constants';
import { useScript } from '../../hooks/useScript';
import {
  getCurrentWeatherAsync,
  getWeatherForecastAsync,
  selectLatAndLon,
  selectWeather,
  setLatAndLon,
} from './weatherSlice';

export const useHooks = () => {
  const latAndLon = useAppSelector(selectLatAndLon);
  const weather = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();
  const [currentAddress, setCurrentAddress] = useState('');

  const { loaded: isGoogleApiScriptLoaded } = useScript(
    `${config.apis.google.url}/js?key=${config.apis.google.key}&libraries=places`
  );

  const onFetchClick = useCallback(() => {
    if (!latAndLon) {
      return alert('Invalid input: Enter city name');
    }

    dispatch(getCurrentWeatherAsync(latAndLon));
    dispatch(getWeatherForecastAsync(latAndLon));
  }, [dispatch, currentAddress, latAndLon]);

  const onPlacesChange = useCallback((address) => {
    setCurrentAddress(address);
  }, []);

  const onPlacesSelect = useCallback((address) => {
    setCurrentAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => dispatch(setLatAndLon({ lat, lon: lng })))
      .catch((e) => console.error('Error', e));
  }, []);

  return {
    weather,
    isGoogleApiScriptLoaded,
    currentAddress,
    onPlacesChange,
    onPlacesSelect,
    onFetchClick,
  };
};
