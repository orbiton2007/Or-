import { combineReducers } from 'redux';
import {
  locationsRedducer,
  selectLocationReducer,
  favoritesLocationsReducer,
  currLocationReducer,
} from './locationsReducer';
import { currWeatherRedducer, dailyForecastReducer } from './weatherReducer';

export default combineReducers({
  locations: locationsRedducer,
  currWeather: currWeatherRedducer,
  selectedLocation: selectLocationReducer,
  dailyForecast: dailyForecastReducer,
  favoritesLocations: favoritesLocationsReducer,
  currLocation: currLocationReducer,
});
