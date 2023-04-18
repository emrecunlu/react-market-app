class SaleHelper {
  static toMoneyFormat(value) {
    return value.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    })
  }
}

export default SaleHelper
