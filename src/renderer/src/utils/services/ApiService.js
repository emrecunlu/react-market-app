import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7193/api'
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const storage = await window.api.getStoreValue('personal')

    if (storage?.accessToken) {
      config.headers.Authorization = `Bearer ${storage.accessToken.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
