import types from '../types'

export const currWeatherRedducer = (currWeather = null, action) => {
  if (action.type === types.FETCH_CURR_WEATHER) {
      return action.payload.data[0];
  }
  return currWeather;
}

export const dailyForecastReducer = (dailyForecast = null, action) => {
  if (action.type === types.FETCH_DAILY_FORECAST) {
    return action.payload.data;
  }
  return dailyForecast;
};

