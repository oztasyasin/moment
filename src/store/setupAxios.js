
export default function setupAxios(axios, store) {
    axios.interceptors.request.use(
      config => {
        const {
          auth: { authToken }
        } = store.getState();
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        config.timeout= 6000;
        return config;
      },
      err => Promise.reject(err)
    );
  }
  