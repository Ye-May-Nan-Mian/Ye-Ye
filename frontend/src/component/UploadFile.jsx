import React, { Component } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Service from "../Service";
import store from "../store";
import {
    changeFile,
    changeFileName,
    chagneImgWidth
} from "store/actionCreators";

const service = new Service();

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.updatePage = this.updatePage.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    updatePage(data) {
        const action1 = changeFile(data.imgs);
        store.dispatch(action1);
        const action2 = changeFileName(data.fileName);
        store.dispatch(action2);
        const action3 = chagneImgWidth(data.imgWidth);
        store.dispatch(action3);
    }

    // On file select
    onFileChange(event) {
        // Update the state
        this.selectedFile = event.target.files;
        // Details of the uploaded file
        // console.log(this.selectedFile);

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        for (const file in this.selectedFile) {
            formData.append("file", this.selectedFile[file]);
        }

        this.onFileUpload(formData);
    }

    // On file upload
    onFileUpload(formData) {
        // Request to the backend
        service
            .uploadFile(formData)
            .then((v) => {
                console.log(v);
                if (v && v.imgs && v.imgs.length > 0) {
                    // send (file to) images to page.jsx
                    this.updatePage({
                        imgs: v.imgs,
                        fileName: this.selectedFile[0].name,
                        imgWidth: 90
                    });
                } else {
                    // console.error("Upload/Handle file failed, I get: ", v);
                }
            })
            .catch((e) => {
                console.warn("Confirm whether backend is running %s", e);
            });
    }

    render() {
        return (
            <div className="uploadfile">
                <input
                    ref={this.fileInputRef}
                    id="inputfile"
                    key={"inputfile"}
                    type={"file"}
                    accept={"application/pdf,image/jpeg,image/jpg,image/png"}
                    name={"pdf/picture"}
                    multiple={true}
                    onChange={this.onFileChange}
                    style={{ display: "none" }}
                />
                <UploadOutlined
                    className={`${"tool-icon"} ${"toolIcon"}`}
                    onClick={() => this.fileInputRef.current.click()}
                />
            </div>
        );
    }
}

export default UploadFile;
