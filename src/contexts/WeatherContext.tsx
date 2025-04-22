import weatherApi from '@/services/weatherApi';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  ForecastData,
  SearchHistoryItem,
  WeatherData,
} from '../models/weather.types';

interface WeatherContextProps {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  searchHistory: SearchHistoryItem[];
  isLoading: boolean;
  error: string | undefined;
  currentCity: string;
  searchCity: (city: string) => Promise<boolean>;
  deleteHistoryItem: (query: string) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [searchHistory, setSearchHistory] = useLocalStorage<
    SearchHistoryItem[]
  >('weatherSearchHistory', []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentCity, setCurrentCity] = useState<string>('');

  const searchCity = async (city: string) => {
    if (!city.trim()) return false;
    setIsLoading(true);
    setError(undefined);
    const { body: weather, error: weatherErr } = await weatherApi.getCurrentWeather({ city });
    const { body: forecase, error: forecaseErr } = await weatherApi.getForecast({ city });
    if (weather) {
      setCurrentWeather(weather);
    } else {
      setError(weatherErr?.message)
      setIsLoading(false);
      return false;
    }
    if (forecase) {
      setForecast(forecase);
    } else {
      setError(forecaseErr?.message)
      setIsLoading(false);
      return false;
    }
    setCurrentCity(city);
    const existingIndex = searchHistory.findIndex(
      (item) => item.query.toLowerCase() === city.toLowerCase()
    );
    if (existingIndex !== -1) {
      const updatedHistory = [...searchHistory];
      updatedHistory.splice(existingIndex, 1);
      updatedHistory.unshift({ query: city, timestamp: Date.now() });
      setSearchHistory(updatedHistory);
    } else {
      setSearchHistory(
        [{ query: city, timestamp: Date.now() }, ...searchHistory].slice(0, 10)
      );
    }
    setIsLoading(false);
    return true;
  };

  const deleteHistoryItem = (query: string) => {
    setSearchHistory(searchHistory.filter((item) => item.query !== query));
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        searchHistory,
        isLoading,
        error,
        currentCity,
        searchCity,
        deleteHistoryItem,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
