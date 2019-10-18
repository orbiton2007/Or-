import axios from 'axios';
import types from '../types';
import StorageService from '../storageService';

const KEY = 'dEFgF8MWhHoAMR4GIXmXYdAot1SZjl5F';
const KEY_LOCAL_STORAGE = 'favorites';

export const fetchLocations = searchText => async dispatch => {
  const response = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}&q=${searchText}&cors=true`
  );
  dispatch({ type: types.FETCH_LOCATIONS, payload: response });
};

export const fetchCurrWeather = locationKey => async dispatch => {
  const response = await axios.get(
    `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${KEY}&cors=true`
  );
  dispatch({ type: types.FETCH_CURR_WEATHER, payload: response });
};

export const selectLocation = location => {
  return {
    type: types.SELECT_LOCATION,
    payload: location,
  };
};

export const fetchFiveDayDailyForecast = locationKey => async dispatch => {
  const response = await axios.get(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${KEY}&cors=true`
  );
  dispatch({ type: types.FETCH_DAILY_FORECAST, payload: response });
};

export const fetchCurrLocation = (lat, lon) => async dispatch => {
  const response = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${KEY}&q=${lat}%2C${lon}&toplevel=true&cors=true`
  );
  dispatch({ type: types.FETCH_CURRENT_LOCATION, payload: response });
};

export const addToFavorites = location => async dispatch => {
  let favorites = await StorageService.load(KEY_LOCAL_STORAGE);
  if (!favorites) {
    favorites = [];
  }
  favorites.push(location);
  StorageService.store(KEY_LOCAL_STORAGE, favorites);
  dispatch({ type: types.ADD_TO_FAVORITES, payload: favorites });
};

export const removeFromFavorites = location => async dispatch => {
  let favorites = await StorageService.load(KEY_LOCAL_STORAGE);
  const idx = favorites.findIndex(favorite => favorite.Key === location.Key);
  favorites.splice(idx, 1);
  StorageService.store(KEY_LOCAL_STORAGE, favorites);
  dispatch({ type: types.REMOVE_FROM_FAVORITES, payload: favorites });
};

export const getFavoritesLocations = () => async dispatch => {
  let favorites = await StorageService.load(KEY_LOCAL_STORAGE);
  if (!favorites) favorites = [];
  dispatch({ type: types.SET_FAVORITES, payload: favorites });
};
