import axiosInstance from '../utils/services/ApiService'

class AuthRepository {
  login(username, password) {
    return axiosInstance.post('/auth/login', { username, password })
  }
}

export default new AuthRepository()
