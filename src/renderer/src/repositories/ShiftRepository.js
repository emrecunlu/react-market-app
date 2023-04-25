import axiosInstance from '../utils/services/ApiService'

class ShiftRepository {
  static getAll() {
    return axiosInstance.get('/shift')
  }
}

export default ShiftRepository
