import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {BASE_URL_FILES, TIMEOUT} from '../constants/.env';

const config = {
  baseURL: BASE_URL_FILES,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const CustomAxiosMultipart: AxiosInstance = axios.create(config);

CustomAxiosMultipart.interceptors.request.use(
  async (_config: AxiosRequestConfig) => {
    const token: string | null = await AsyncStorage.getItem('token');
    if (token) {
      _config.headers.Authorization = token;
    }
    return _config;
  },
  error => {
    Promise.reject(error);
  },
);

export default CustomAxiosMultipart;
