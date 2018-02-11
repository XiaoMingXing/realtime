import io from "socket.io-client"
import publicIp from "public-ip"

function public_ip(callbak) {
    publicIp.v4().then(current_ip => {
        console.log("CURRENT IP:", current_ip);
        let BACKEND_URL = "http://" + current_ip + ":8089";
        let socket = io(BACKEND_URL);
        callbak(socket)
    });
}

export default public_ip
