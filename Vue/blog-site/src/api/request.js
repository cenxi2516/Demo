import axios from "axios";
import { Message } from "@/tools";

const instance = axios.create();

instance.interceptors.response.use((response) => {
    const { data } = response;
    if (data.code !== 0) {
        Message.error({
            content: data.msg
        });
    }

    return data.data;
});


export default instance;