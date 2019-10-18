import React from 'react';
import './favorites.scss';
import { fetchCurrWeather, fetchFiveDayDailyForecast, selectLocation, getFavoritesLocations } from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

class Favorites extends React.Component {
    componentDidMount(){
      this.props.getFavoritesLocations()
    }

  onSelectLocation = location => {
    this.props.selectLocation(location);
    this.props.fetchCurrWeather(location.Key);
    this.props.fetchFiveDayDailyForecast(location.Key);
    this.props.history.push('/')
  };

  render() {
    return (
      <div style={{padding:20}}>
        <h2>Favorites Locations</h2>
        {this.props.favoritesLocations.length ? (
          <div className='favorites'>
            {this.props.favoritesLocations.map(location => (
              <div
                className='favorite-location flex column'
                key={location.Key}
                onClick={() => this.onSelectLocation(location)}
              >
                <div className='location-name'>{location.LocalizedName}</div>
                <div>
                  <img
                    className='weather-icon'
                    src={`https://www.accuweather.com/images/weathericons/${location.icon}.svg`}
                    alt=''
                  />
                </div>
                <div>
                  {location.temperature}&deg; {location.temperatureSymbol}
                </div>
                <div>{location.weatherText}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>No favorites</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { favoritesLocations: state.favoritesLocations };
};

export default connect(
  mapStateToProps,
  { fetchCurrWeather, fetchFiveDayDailyForecast, selectLocation, getFavoritesLocations }
)(withRouter(Favorites));
