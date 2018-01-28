import io from "socket.io-client"

let BACKEND_URL = "http://35.227.63.169:8080";
let socket = io(BACKEND_URL);

export default socket
