import {HttpResponse} from '@/models/http.types';
import {ForecastData, WeatherData} from '@/models/weather.types';
import axiosClient, {handleRequest} from './axios';
import env from '@/app/env';

const API_KEY = env.apiKey;

const weatherApi = {
  getCurrentWeather: ({
    city,
  }: {
    city: string;
  }): Promise<HttpResponse<WeatherData>> => {
    const url = `/weather?q=${city}&units=metric&appid=${API_KEY}`;
    return handleRequest(axiosClient.get(url));
  },

  getForecast: ({
    city,
  }: {
    city: string;
  }): Promise<HttpResponse<ForecastData>> => {
    const url = `/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    return handleRequest(axiosClient.get(url));
  },
};

export default weatherApi;
