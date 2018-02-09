import io from "socket.io-client"

let BACKEND_URL = "http://localhost:8089";
let socket = io(BACKEND_URL);

export default socket
