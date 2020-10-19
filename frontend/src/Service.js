import axios from "axios";
const API_URL = "http://localhost:8000";

export default class Service {
    // constructor() {}

    // formData's type is FormData
    // it includes many attributes
    // you can select one that you favourite
    uploadFile(formData) {
        const url = `${API_URL}/file/`;
        console.log("already upload file");
        console.log(formData);
        return axios.post(url, formData).then((response) => response.data);
    }
    uploadPic(pic) {
        const url = `${API_URL}/pic/`;
        return axios.post(url, pic).then((response) => response.data);
    }
}
