import React from 'react';
import { ForecastsByDay, ForecastItem } from '../../models/weather.types';
import { formatTime } from '../../utils/dateUtils';
import './Forecast.css';

interface ForecastProps {
  forecastsByDay: ForecastsByDay;
}

const Forecast: React.FC<ForecastProps> = ({ forecastsByDay }) => {
  return (
    <div className="forecast-wrapper">
      <h2>5-day Forecast (3 Hours)</h2>

      <div className="forecast">
        {Object.entries(forecastsByDay).map(([date, forecasts], i) => (
          <div key={date} className="forecast-day">
            <h3>{i === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h3>
            <div className="forecast-items">
              {forecasts.map((item: ForecastItem) => (
                <div key={item.dt} className="forecast-item">
                  <div className="forecast-time">{formatTime(item.dt)}</div>
                  <div className='forecast-climate'>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="forecast-icon"
                    />
                    <div className="forecast-temp">
                      {item.main.temp_max}° / {item.main.temp_min}°
                    </div>
                  </div>
                  <div className="forecast-desc">{item.weather[0].description}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

export default Forecast;