import axios from "axios"

const http = axios.create({
    // 开发时用localhost
    // http://localhost:8080/
    baseURL: "http://nikfce.com:8080/",
    withCredentials: true
});

// 响应拦截
http.interceptors.response.use(
    (data) => {
        // 请求后处理对应的数据
        return data.data;
    },
    (err) => {
        // 错误处理
        return Promise.reject(err);
    }
);

export default http;