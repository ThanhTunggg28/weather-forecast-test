import env from '@/app/env';
import AxiosResponseData from '@/models/axios.types';
import {HttpResponse} from '@/models/http.types';
import handleError from '@/utils/handleErrorUtils';
import axios, {AxiosResponse} from 'axios';

const axiosClient = axios.create({
  baseURL: env.baseGatewayUrl || 'https://api.openweathermap.org/data/2.5',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  // @ts-expect-error: we want to return the different data type
  (response: AxiosResponse<AxiosResponseData>) => {
    const {status, data: responseData, headers} = response;

    const data: HttpResponse<object> = {
      status,
      ok: true,
      body: responseData,
    };

    if (headers.link) {
      data.pagination = {
        paging: 0,
        total: Number(headers['x-total-count']),
      };
    }

    return data;
  },
  ({response}) => {
    const {status, data} = response as AxiosResponse<AxiosResponseData>;

    const error: HttpResponse = {
      status,
      ok: false,
      error: {
        unauthorized: status === 401,
        badRequest: status === 400,
        notFound: status === 404,
        clientError: status >= 400 && status <= 499,
        serverError: status >= 500 && status <= 599,
        message: handleError(data.message),
        data: data.data,
      },
    };

    return Promise.reject(error);
  }
);

const handleRequest = (promise: Promise<HttpResponse>) =>
  promise.then((res) => res).catch((err) => err as HttpResponse<any>);

export default axiosClient;

export {handleRequest};
