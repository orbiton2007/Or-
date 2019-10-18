import React from 'react';
import './Weather.scss';
import favoriteImg from '../../assets/images/favorite.png';
import deleteImg from '../../assets/images/delete.png';
import { connect } from 'react-redux';
import SearchLocation from '../../components/search-location/SearchLocation';
import DailyForecast from '../../components/daily-forecast/DailyForecast';
import {
  addToFavorites,
  removeFromFavorites,
  getFavoritesLocations,
  fetchCurrLocation,
  selectLocation,
  fetchCurrWeather,
  fetchFiveDayDailyForecast,
} from '../../store/actions/index';
import moment from 'moment';

class Weather extends React.Component {
  constructor() {
    super();
    this.state = { lat: '', lon: '', showCelsius: false };
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude, lon: position.coords.longitude });
        this.props.fetchCurrLocation(this.state.lat, this.state.lon);
      },
      err => console.log(err)
    );
  }

  componentDidMount() {
    this.props.getFavoritesLocations();
  }

  onAddToFavorites = () => {
    const favoriteLocation = {
      Key: this.props.selectedLocation.Key,
      LocalizedName: this.props.selectedLocation.LocalizedName,
      icon: this.props.currWeather.WeatherIcon,
      date: this.props.currWeather.LocalObservationDateTime,
      temperature: this.props.currWeather.Temperature.Metric.Value,
      temperatureSymbol: this.props.currWeather.Temperature.Metric.Unit,
      weatherText: this.props.currWeather.WeatherText,
    };
    this.props.addToFavorites(favoriteLocation);
  };

  onRemoveFromFavorites = () => {
    this.props.removeFromFavorites(this.props.selectedLocation);
  };

  getCurrLocationDetails = () => {
    this.props.selectLocation(this.props.currLocation);
    this.props.fetchCurrWeather(this.props.currLocation.Key);
    this.props.fetchFiveDayDailyForecast(this.props.currLocation.Key);
  };

  toggleTemp = () => {
    this.setState(state => ({ showCelsius: !state.showCelsius }));
  };

  render() {
    if (this.props.currLocation && !this.props.selectedLocation) {
      this.getCurrLocationDetails();
    }
    return (
      <div className='weather-container flex column'>
        <div className='search-location-container'>
          <SearchLocation></SearchLocation>
        </div>
        {this.props.currWeather && this.props.dailyForecast ? (
          <div>
            <div className='celsius-btn'>
              <span className='celsius-title'>Celsius</span>
              <label className='switch'>
                <input type='checkbox' onChange={this.toggleTemp}></input>
                <span className='slider round'></span>
              </label>
            </div>
            <div className='current-weather-with-btns flex space-between'>
              <div className='flex current-weather'>
                <div className='location-name flex'>{this.props.selectedLocation.LocalizedName}</div>
                <div className='weather-details flex column'>
                  <div>
                    <img
                      className='weather-icon'
                      src={`https://www.accuweather.com/images/weathericons/${this.props.currWeather.WeatherIcon}.svg`}
                      alt=''
                    />
                  </div>
                  <div>{moment(this.props.currWeather.LocalObservationDateTime).format('dddd')}</div>
                  {this.state.showCelsius ? (
                    <div>
                      {this.props.currWeather.Temperature.Metric.Value}&deg; {this.props.currWeather.Temperature.Metric.Unit}
                    </div>
                  ) : (
                    <div>
                      {this.props.currWeather.Temperature.Imperial.Value}&deg;{' '}
                      {this.props.currWeather.Temperature.Imperial.Unit}
                    </div>
                  )}
                  <div>{this.props.currWeather.WeatherText}</div>
                </div>
              </div>
              <div>
                {this.props.favoritesLocations.length &&
                this.props.favoritesLocations.some(
                  favorite => favorite.LocalizedName === this.props.selectedLocation.LocalizedName
                ) ? (
                  <button className='btn remove' onClick={this.onRemoveFromFavorites}>
                    Remove from favorites
                    <img style={{ width: 20, marginLeft: 5 }} src={deleteImg} alt='Delete' />
                  </button>
                ) : (
                  <button className='btn add' onClick={this.onAddToFavorites}>
                    Add to favorites
                    <img style={{ width: 20, marginLeft: 5 }} src={favoriteImg} alt='Add' />
                  </button>
                )}
              </div>
            </div>
            <div>
              <DailyForecast
                dailyForecasts={this.props.dailyForecast.DailyForecasts}
                showCelsius={this.state.showCelsius}
              ></DailyForecast>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currWeather: state.currWeather,
    selectedLocation: state.selectedLocation,
    dailyForecast: state.dailyForecast,
    favoritesLocations: state.favoritesLocations,
    currLocation: state.currLocation,
  };
};

export default connect(
  mapStateToProps,
  {
    addToFavorites,
    removeFromFavorites,
    getFavoritesLocations,
    fetchCurrLocation,
    selectLocation,
    fetchCurrWeather,
    fetchFiveDayDailyForecast,
  }
)(Weather);
