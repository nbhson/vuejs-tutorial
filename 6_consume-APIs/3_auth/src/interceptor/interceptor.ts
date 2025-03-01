import axios from 'axios';

let store: any;
const injectStore = (_store: any) => {
  store = _store;
};

axios.interceptors.request.use(
  function (config: any) {
    if (config.url !== 'http://localhost:3000/auth/register') {
      config.headers.Authorization = `Bearer ${store.getters.jwt}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { axios, injectStore };
