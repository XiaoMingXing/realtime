import io from "socket.io-client"
import ip from "ip"

let current_ip = ip.address();
console.log("CURRENT IP:", current_ip);
let BACKEND_URL = "http://" + current_ip + ":8089";
let socket = io(BACKEND_URL);


export default socket
