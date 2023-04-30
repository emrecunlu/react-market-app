import axios from 'axios'
import { toast } from 'react-hot-toast'

const baseURL = 'http://localhost:7193/api'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  async (config) => {
    const storage = await window.api.getStoreValue('personal')
    const settings = await window.api.getStoreValue('settings')

    config.baseURL = settings?.serverAddress ?? baseURL

    if (storage?.accessToken) {
      config.headers.Authorization = `Bearer ${storage.accessToken.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const response = error?.response

    if (response) {
      if (response?.data?.Message) {
        toast.error(response.data.Message)
      } else {
        switch (response.status) {
          case 400:
            return toast.error('Yanlış veya hatalı istek!')
          case 400:
            return toast.error('Sayfa bulunamadı!')
          case 401:
            return toast.error('Oturum hatası!')
          case 403:
            return toast.error('İzin hatası!')
          case 500:
            return toast.error('Server hatası!')
          default:
            return toast.error('Hata meydana geldi!')
        }
      }
    } else {
      toast.error('Hata meydana geldi!')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
