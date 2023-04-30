import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { toast } from 'react-hot-toast'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [error, setError] = useState(false)

  const data = {
    socket,
    setSocket
  }

  const connectHugin = async () => {
    const localAddress = await window.api.getLocalAddress()

    const newSocket = new WebSocket(`ws://${localAddress}:1235`)

    setSocket(newSocket)

    newSocket.addEventListener('open', () => {
      toast.success('Yazarkasaya iletişimi kuruluyor.')
    })

    newSocket.addEventListener('message', (data) => {
      const response = JSON.parse(data.data)

      switch (response?.status) {
        case 200:
          setError(false)
          return toast.success(response?.data)
        case 500:
          setError(true)
          connectHugin()
          return toast.error(response?.data)
        default:
          return
      }
    })

    newSocket.addEventListener('error', () => {
      toast.error('Yazarkasa bağlantı hatası(Socket Error)')

      connectHugin()
    })

    console.log(newSocket.readyState, newSocket.onopen)

    return () => {
      newSocket.close()
    }
  }

  console.log(socket?.readyState);

  useEffect(() => {
    connectHugin()
  }, [])

  return <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
}

export default SocketProvider

export const useSocket = () => useContext(SocketContext)
