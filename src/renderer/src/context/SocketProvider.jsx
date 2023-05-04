import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { toast } from 'react-hot-toast'
import { ReportType } from '../config/constants'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(true)

  const data = {
    socket,
    setSocket,
    error,
    setError,
    loading
  }

  const connectHugin = async () => {
    const localAddress = await window.api.getLocalAddress()

    const newSocket = new WebSocket(`ws://${localAddress}:1235`)
    let toastId = null
    setSocket(newSocket)

    newSocket.addEventListener('open', () => {
      toastId = toast.loading('Yazarkasaya bağlanılıyor...')
      setLoading(true)

      window.api.addLog('info', 'Yazarkasaya bağlanılıyor')
    })

    newSocket.addEventListener('message', (data) => {
      const response = JSON.parse(data.data)

      if (response?.status === 200) {
        setError(false)
        setLoading(false)
        toast.success('Yazarkasaya bağlanıldı.', { id: toastId })
        window.api.addLog('info', 'Yazarkasa bağlantısı başarılı')
      } /* else if (response?.status === 223) {
        const Data = {
          SlipCopy: false,
          ReportType: ReportType.Disconnect,
          Data: []
        }

        newSocket.send(JSON.stringify(Data))

        setError(true)
      } */ else {
        setError(true)
        toast.error(response?.data ?? 'Yazarkasa Hatası!', { id: toastId })
        window.api.addLog('error', 'Yazarkasa hatası: ' + response?.data ?? 'Hata bilinmiyor')
        connectHugin()
      }
    })

    newSocket.addEventListener('error', () => {
      toast.error('Yazarkasa bağlantı hatası, yeniden bağlanılıyor...', { id: toastId })

      window.api.addLog('error', 'Yazarkasa bağlantı hatası, yeniden bağlanılıyor..')
      connectHugin()
    })

    newSocket.addEventListener('close', () => {
      toast.error('Socket hatası, lütfen programı yeniden başlatınız!', { id: toastId })
      window.api.addLog('error', 'Socket bağlantısı kapatıldı')
      setError(true)
    })

    return () => {
      newSocket.close()
    }
  }

  useEffect(() => {
    connectHugin()
  }, [])

  return <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
}

export default SocketProvider

export const useSocket = () => useContext(SocketContext)
