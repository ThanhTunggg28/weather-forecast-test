import React from 'react';
import { WeatherData } from '../../models/weather.types';
import { formatDate } from '../../utils/dateUtils';
import './CurrentWeather.css';
import ImageLoader from '../Common/ImageLoader';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data) return null;

  const {
    name,
    dt,
    main: { temp, humidity },
    weather,
    wind,
    visibility,
    sys
  } = data;

  return (
    <div className="current-weather">
      <div className="date">{formatDate(dt)}</div>

      <div className="weather-main">
        <div className='weather-main__icon'>
          <ImageLoader value={weather[0]} />
        </div>
        <div className="weather-main__desc">
          <div className="temperature">{Math.round(temp)}°C</div>
          <div className="description">{weather[0].description}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{humidity} %</span>
        </div>

        <div className="detail">
          <span className="label">Winds</span>
          <span className="value">
            <span className="wind-arrow" style={{ transform: `rotate(${wind.deg}deg)` }}>↓</span>
            {wind.speed} m/s
          </span>
        </div>

        <div className="detail">
          <span className="label">Visibility</span>
          <span className="value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;