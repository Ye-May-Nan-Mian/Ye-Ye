import axios from "axios";
const API_URL = "http://localhost:8000";

export default class Service {
    // constructor() {}

    // formData's type is FormData
    // it includes many attributes
    // you can select one that you favourite
    uploadFile(file) {
        const url = `${API_URL}/file/`;
        console.log("already upload file");
        return axios.post(url, file).then((response) => response.data);
    }
    uploadPic(pic) {
        const url = `${API_URL}/pic/`;
        console.log("alread upload picture");
        return axios.post(url, pic).then((response) => response.data);
    }
}
