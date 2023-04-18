import axiosInstance from '../utils/services/ApiService'

class StockRepository {
  getStocks(search = '') {
    const query = search === '' ? '/stock' : `/stock?search=${search}`
    return axiosInstance.get(query)
  }

  getStock(code) {
    return axiosInstance.get('/stock/stokKodu?stokKodu=' + code)
  }
}

export default new StockRepository()
