import React, { useEffect } from 'react';
import { useWeather } from '../../contexts/WeatherContext';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import Forecast from '../../components/Forecast/Forecast';
import { groupForecastsByDay } from '../../utils/weatherUtils';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { LocaionIcon, SearchIcon } from '@/assets/icons';
import LoadingPage from '@/components/Common/LoadingPage';

const HomePage: React.FC = () => {
  const { currentWeather, forecast, isLoading, error, currentCity, searchCity } =
    useWeather();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentWeather) {
      searchCity('Singapore, SG');
    }
  }, [currentWeather]);

  const handleSearch = () => {
    navigate('/search');
  };

  const forecastsByDay = forecast ? groupForecastsByDay(forecast.list) : {};

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className='home-page'>
      <header className='header'>
        <div className='location'>
          <LocaionIcon />
          <span>{currentCity || 'Loading...'}</span>
        </div>
        <button className='search-icon' onClick={handleSearch}>
          <SearchIcon />
        </button>
      </header>

      <main className='content'>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && Object.keys(forecastsByDay).length > 0 && (
          <Forecast forecastsByDay={forecastsByDay} />
        )}
      </main>
    </div>
  );
};

export default HomePage;
