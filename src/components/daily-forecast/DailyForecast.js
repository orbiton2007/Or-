import React from 'react';
import './DailyForecast.scss';
import moment from 'moment';

const DailyForecast = props => {
  return (
    <div className='daily-forecast-container flex flex-wrap'>
      {props.dailyForecasts.map(forcast => (
        <div className='daily-forecast flex column' key={forcast.EpochDate}>
          <div>{moment(forcast.Date).format('dddd')}</div>
          <div>
            <img
              className='weather-icon'
              src={`https://www.accuweather.com/images/weathericons/${forcast.Day.Icon}.svg`}
              alt=''
            />
          </div>
          <div>
            <img
              className='weather-icon'
              src={`https://www.accuweather.com/images/weathericons/${forcast.Night.Icon}.svg`}
              alt=''
            />
          </div>

          {props.showCelsius ? (
            <div>
              {Math.ceil(((forcast.Temperature.Maximum.Value - 32) * 5) / 9)}&deg;C/
              {Math.ceil(((forcast.Temperature.Minimum.Value - 32) * 5) / 9)}&deg;C
            </div>
          ) : (
            <div>
              {forcast.Temperature.Maximum.Value}&deg;
              {forcast.Temperature.Maximum.Unit}/{forcast.Temperature.Minimum.Value}&deg;
              {forcast.Temperature.Minimum.Unit}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
