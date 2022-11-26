import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../../app/config.json";

const http = axios.create({ baseURL: configFile.apiEndpoint });

// axios.defaults.baseURL = configFile.apiEndpoint; // настройки по умолчанию, которые будут применяться к каждому запросу.

http.interceptors.request.use(
    // добавляем ".json" до отправки запроса
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            console.log(config.url);
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data ? Object.keys(data).map((key) => ({ ...data[key] })) : []; // трансформация данных из объекта в массив
}

http.interceptors.response.use(
    // обрабатываем данные, получ  с сервера, изменяем их, если требуется и возвращаем обновленные
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
            //  console.log(res.data);
        }
        return res;
    },

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
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
