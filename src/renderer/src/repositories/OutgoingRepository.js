import axiosInstance from '../utils/services/ApiService'

class OutgoingRepository {
  static getAll() {
    return axiosInstance.get('/outgoing')
  }

  static add(obj) {
    return axiosInstance.post('/outgoing/add', obj)
  }

  static update(obj) {
    return axiosInstance.post('/outgoing/update', obj)
  }

  static remove(id) {
    return axiosInstance.post('/outgoing/delete?id=' + id)
  }
}

export default OutgoingRepository
