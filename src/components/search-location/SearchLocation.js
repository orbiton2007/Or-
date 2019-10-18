import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrWeather, fetchFiveDayDailyForecast, fetchLocations, selectLocation } from '../../store/actions/index';
import { debounce } from 'lodash';
import './SearchLocation.scss';
import searchIcon from '../../assets/icons/search.svg';

class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '', showSuggestions: false };
  }

  handleInputChange = e => {
    this.setState({
      showSuggestions: true,
      searchText: e.target.value,
    });
    if (e.target.value.length) {
      this.fetchFromAPI();
    } else {
      this.setState({
        showSuggestions: false,
      });
    }
  };

  fetchFromAPI = debounce(async () => {
    this.props.fetchLocations(this.state.searchText);
  }, 500);

  onSetLocation = city => {
    this.setState({ searchText: '', showSuggestions: false });
    this.props.selectLocation(city);
    this.props.fetchCurrWeather(city.Key);
    this.props.fetchFiveDayDailyForecast(city.Key);
  };

  render() {
    return (
      <div className='search-container'>
        <form>
          <img className='search-icon' src={searchIcon} alt='search-icon' />
          <input
            className='search-input'
            placeholder='Search city'
            onChange={this.handleInputChange}
            value={this.state.searchText}
          />
        </form>
        {this.state.showSuggestions ? (
          <div className='results'>
            {this.props.locations.length ? (
              this.props.locations.map(city => (
                <div className='result' key={city.Key} onClick={() => this.onSetLocation(city)}>
                  {city.LocalizedName}
                </div>
              ))
            ) : (
              <div className='no-results'>No suggestions found</div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { locations: state.locations };
};
export default connect(
  mapStateToProps,
  { fetchCurrWeather, fetchFiveDayDailyForecast, fetchLocations, selectLocation }
)(SearchLocation);
