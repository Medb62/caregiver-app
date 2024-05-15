/* eslint-disable no-underscore-dangle */
import * as SecureStore from 'expo-secure-store';
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from '@/config';
import { refreshAccessToken } from './apiHelpersConfig';

interface OriginalRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// this axios instance will contain all the configs needed for the api
// will be filled with time
const apiClient: AxiosInstance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  const newConfig = config;
  newConfig.headers.Authorization = `Bearer ${token}`;
  return newConfig;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: OriginalRequest = error.config!;

    if (error.response?.status === 401) {
      originalRequest._retry = true;
      try {
        const { token, refreshToken } = await refreshAccessToken();
        await SecureStore.setItemAsync('token', token);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        return await apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
