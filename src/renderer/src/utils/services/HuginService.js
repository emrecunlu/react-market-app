class HuginService {
  _socket
  _ipAddress

  constructor(ipAddress) {
    this._ipAddress = ipAddress
    this._socket = new WebSocket(`ws:\\${ipAddress}`)
  }

  reconnect() {
    super(this._ipAddress)
  }

  get socket() {
    return this._socket
  }
}
