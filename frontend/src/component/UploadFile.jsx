import React, { Component } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Service from "../Service";

const service = new Service();

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    // On file select (from the pop up)
    onFileChange(event) {
        // Update the state
        this.selectedFile = event.target.files;
        // Details of the uploaded file
        // console.log(this.selectedFile);
        this.onFileUpload();
    }

    // On file upload (click the upload button)
    onFileUpload() {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        for (const file in this.selectedFile) {
            formData.append("file", this.selectedFile[file]);
        }

        // Request to the backend
        const status = service.uploadFile(formData);

        let that = this;
        status
            .then((v) => {
                if (v && v.imgs && v.imgs.length > 0) {
                    // console.log("Upload file successfully, I get: ", v);
                    // send (file to) images to page.jsx
                    that.props.getFile({
                        imgs: v.imgs,
                        fileName: this.selectedFile[0].name
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
