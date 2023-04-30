import { PaymentType } from '../../config/constants'

class ReportHelper {
  static getPaymentName(paymentType) {
    const arr = Object.entries(PaymentType)

    return arr.find(([val, key]) => paymentType === key)[0] ?? ''
  }
}

export default ReportHelper
