import React, { useEffect, useState } from 'react'
import styles from './Printer.module.css'
import moment from 'moment'
import SaleHelper from '../../utils/helpers/saleHelper'

const PrinterPage = () => {
  const [data, setData] = useState(null)

  const getLastSlip = async () => {
    const slip = await window.api.getStoreValue('slip')

    if (slip) {
      slip.totalPrice = slip?.sales.reduce((prev, item) => prev + item.amount * item.price, 0)

      setData(slip)
    }
  }

  useEffect(() => {
    getLastSlip()
  }, [])

  if (!data) return 'Fiş verisi bulunamadı!'

  return (
    <div className={styles.barcode}>
      <h1 className={styles.companyName}>TRN PETROL</h1>
      {/* <div className={styles.address}>
        <span>7 EYLÜL MH 5520 SK. NO: 16 </span>
        <span>TORBALI/IZMIR TEL: (232) 853 23 00</span>
      </div> */}
      <div className={styles.header}>
        <h1>BİLGİ FİŞİ</h1>
        <ul>
          <li>
            <span>TARİH:</span>
            <span>{moment(data.createdAt).format('DD.MM.YYYY')}</span>
          </li>
          <li>
            <span>SAAT:</span>
            <span>{moment(data.createdAt).format('HH:mm:ss')}</span>
          </li>
          <li>
            <span>{data.slipId}</span>
          </li>
        </ul>
      </div>
      {data?.customerName && (
        <div className={styles.customerName}>
          <h1>{data?.customerName}</h1>
        </div>
      )}
      <div className={styles.items}>
        <table>
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Kdv</th>
              <th>Miktar</th>
              <th>Fiyat</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {data.sales?.map((item, index) => (
              <tr key={index}>
                <td>{item.stockName}</td>
                <td>%{item.vatGroup}</td>
                <td>{item.amount}</td>
                <td>{SaleHelper.toMoneyFormat(item.price)}</td>
                <td>{SaleHelper.toMoneyFormat(item.amount * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.footer}>
        <div className={styles.price}>
          <h1>Genel Toplam</h1>
          <div className={styles.total}>
            <h1>{SaleHelper.toMoneyFormat(data.totalPrice)}</h1>
          </div>
        </div>
        {data.delivery && data.receiver && (
          <Fragment>
            <div className={styles.areaContainer}>
              <div className={styles.area}>
                <h1>TESLİM EDEN</h1>
                <div className={styles.areaField}>
                  <h1>{data.delivery}</h1>
                </div>
              </div>
              <div className={styles.area}>
                <h1>TESLİM ALAN</h1>
                <div className={styles.areaField}>
                  <h1>{data.receiver}</h1>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        <div className={styles.welcomeBack}>
          <h1>...YİNE BEKLERİZ...</h1>
        </div>
      </div>
    </div>
  )
}

export default PrinterPage
