import axios from 'axios';
import { toast } from 'react-toastify';

export const config = {
  baseURL: process.env.NEXT_PUBLIC_TEXT_TO_SPEECH_API_URL || '',
  timeout: 5000 * 10,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin':
      process.env.NEXT_PUBLIC_TEXT_TO_SPEECH_API_URL,
  },
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    const lang = 'en-EN';
    if (lang) {
      config.headers['Accept-Language'] = lang;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  (next) => {
    const message = next.data?.message;
    if (message) {
      toast.success(message);
    }
    return Promise.resolve(next);
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default _axios;
