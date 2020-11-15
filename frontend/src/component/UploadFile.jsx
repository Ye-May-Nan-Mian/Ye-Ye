import React, { Component } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Service from "../Service";
import "../App.css";

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
        this.selectedFile = event.target.files[0];
        // console.log(this.selectedFile);
        this.onFileUpload();
    }

    // On file upload (click the upload button)
    onFileUpload() {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append("file", this.selectedFile);

        // Details of the uploaded file
        // console.log("selected file is ", this.state.selectedFile, "address is ", formData.get("address"));

        // Request to the backend
        const status = service.uploadFile(formData);

        let that = this;
        status
            .then((v) => {
                if (v && v.imgs && v.imgs.length > 0) {
                    // console.log("Upload file successfully, I get: ", v);
                    // send (file to) images to page.jsx
                    that.props.getFile(v.imgs);
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
                    type="file"
                    ref={this.fileInputRef}
                    id="inputfile"
                    key={"inputfile"}
                    multiple={false}
                    onChange={this.onFileChange}
                    style={{ display: "none" }}
                />
                <Button
                    icon={<UploadOutlined />}
                    onClick={() => this.fileInputRef.current.click()}
                    style={{ margin: 5 }}
                />
            </div>
        );
    }
}

export default UploadFile;
