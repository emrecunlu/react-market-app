import axiosInstance from '../utils/services/ApiService'

class SaleRepository {
  static addSale(body) {
    return axiosInstance.post('/sale/add', body)
  }

  static adddByShift(shiftId) {
    return axiosInstance.post('/sale/add-by-shift?shift=' + shiftId)
  }

  static addOutgoing(body) {
    return axiosInstance.post('/sale-outgoing/add', body)
  }

  static getAll(date, userId) {
    return axiosInstance.get(`/sale/sale-summary?date=${date}&userId=${userId}`);
  }
}

export default SaleRepository
