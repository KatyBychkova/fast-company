import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint; // настройки по умолчанию, которые будут применяться к каждому запросу.

axios.interceptors.response.use(
    // обрабатываем данные, получ  с сервера, изменяем их и возвращаем обновленные
    (res) => res,
    // обрабатываем неожидаемую ошибку в случае ее возникновения
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
            // console.log("Unexpected error");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
