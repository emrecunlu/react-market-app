import axiosInstance from '../utils/services/ApiService'

class SaleRepository {
  static addSale(body) {
    return axiosInstance.post('/sale/add', body)
  }
}

export default SaleRepository
