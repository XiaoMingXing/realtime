import io from "socket.io-client"

let BACKEND_URL = "http://35.198.201.186:8080";
let socket = io(BACKEND_URL);

export default socket
