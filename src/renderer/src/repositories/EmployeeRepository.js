import axiosInstance from '../utils/services/ApiService'

class EmployeRepository {
  static getAll() {
    return axiosInstance.get('/employee')
  }

  static update(obj) {
    return axiosInstance.post('/employee/update', obj)
  }

  static add(obj) {
    return axiosInstance.post('/employee/add', obj)
  }

  static remove(id) {
    return axiosInstance.post('/employee/delete', { id })
  }
}

export default EmployeRepository
