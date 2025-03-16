import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

const createSockerConfiguration = ()=>{
    return io(BASE_URL)
}

export default createSockerConfiguration;