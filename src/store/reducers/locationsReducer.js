import types from '../types';

export const locationsRedducer = (locations = [], action) => {
  if (action.type === types.FETCH_LOCATIONS) {
    return action.payload.data;
  }
  return locations;
};

export const selectLocationReducer = (selectedLocation = null, action) => {
  if (action.type === types.SELECT_LOCATION) {
    return action.payload;
  }
  return selectedLocation;
};

export const favoritesLocationsReducer = (favoritesLocations = [], action) => {
  if (
    action.type === types.ADD_TO_FAVORITES ||
    action.type === types.REMOVE_FROM_FAVORITES ||
    action.type === types.SET_FAVORITES
  ) {
    return action.payload;
  }
  return favoritesLocations;
};

export const currLocationReducer = (currLocation = null, action) => {
  if (action.type === types.FETCH_CURRENT_LOCATION) {
    return action.payload.data;
  }
  return currLocation;
};
