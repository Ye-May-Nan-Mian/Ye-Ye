import axios from "axios";
// import store from "./store";
const API_URL = "http://127.0.0.1:34215";
// const NET_URL = "http://8.135.48.48/yeyeapi";
export default class Service {
    getUrl(dir) {
        // const url = store.getState().useNet ? NET_URL : API_URL;
        return `${API_URL}/${dir}`;
    }

    // formData's type is FormData
    // it includes many attributes
    // you can select one that you favourite
    async uploadFile(file) {
        const url = this.getUrl("file/");
        // console.log("already upload file");
        return axios.post(url, file).then((response) => response.data);
    }
    // upload a picture to be processed
    async uploadPic(pic) {
        const url = this.getUrl("pic/");
        // console.log("alread upload picture");
        return axios.post(url, pic).then((response) => response.data);
    }
    // get all history files' name
    async getHistoryall() {
        const url = this.getUrl("historyall/");
        return axios.get(url).then((response) => response.data);
    }
    // get a history file
    async getHistoryfile(value) {
        const url = this.getUrl("historyfile/");
        return axios
            .get(url, { params: value })
            .then((response) => response.data);
    }
    // delete a history file
    async delHistoryfile(value) {
        const url = this.getUrl("historyfile/");
        return axios.get(url, { params: value });
    }
    // post current theme
    async postTheme(theme) {
        const url = this.getUrl("theme/");
        return axios
            .get(url, { params: theme })
            .then((response) => response.data);
    }
    // get last theme
    async getTheme() {
        const url = this.getUrl("theme/");
        return axios.get(url).then((response) => response.data);
    }
}
