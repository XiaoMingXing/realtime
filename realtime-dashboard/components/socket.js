import io from "socket.io-client"

let BACKEND_URL = "http://35.198.250.50:8089";
let socket = io(BACKEND_URL);

export default socket
