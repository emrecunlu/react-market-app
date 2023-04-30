import axiosInstance from '../utils/services/ApiService'

class SaleRepository {
  static addSale(body) {
    return axiosInstance.post('/sale/add', body)
  }

  static adddByShift(userId, documentType) {
    return axiosInstance.post('/sale/add-by-user?userId=' + userId + '&documentType=' + documentType);
  }

  static addOutgoing(body) {
    return axiosInstance.post('/sale-outgoing/add', body)
  }

  static getAll(date, userId) {
    return axiosInstance.get(`/sale/sale-summary?date=${date}&userId=${userId}`);
  }

  static getSaleEndDay() {
    return axiosInstance.get('/sale/sale-end-day');
  }
}

export default SaleRepository
