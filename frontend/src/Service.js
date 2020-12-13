import axios from "axios";
const API_URL = "http://127.0.0.1:34215";
// const API_URL = "http://192.168.43.38:34215";
export default class Service {
    // constructor() {}

    // formData's type is FormData
    // it includes many attributes
    // you can select one that you favourite
    async uploadFile(file) {
        const url = `${API_URL}/file/`;
        // console.log("already upload file");
        return axios.post(url, file).then((response) => response.data);
    }
    // upload a picture to be processed
    async uploadPic(pic) {
        const url = `${API_URL}/pic/`;
        // console.log("alread upload picture");
        return axios.post(url, pic).then((response) => response.data);
    }
    // get all history files' name
    async getHistoryall() {
        const url = `${API_URL}/historyall/`;
        return axios.get(url).then((response) => response.data);
    }
    // get a history file
    async getHistoryfile(value) {
        const url = `${API_URL}/historyfile/`;
        return axios
            .get(url, { params: value })
            .then((response) => response.data);
    }
    // delete a history file
    async delHistoryfile(value) {
        const url = `${API_URL}/historyfile/`;
        return axios.get(url, { params: value });
    }
    // post current theme
    async postTheme(theme) {
        const url = `${API_URL}/theme/`;
        return axios
            .get(url, { params: theme })
            .then((response) => response.data);
    }
    // get last theme
    async getTheme() {
        const url = `${API_URL}/theme/`;
        return axios.get(url).then((response) => response.data);
    }
}
