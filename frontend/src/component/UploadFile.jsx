import React, { Component } from "react";
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
        console.log(this.selectedFile);
        this.onFileUpload();
    }

    // On file upload (click the upload button)
    onFileUpload() {
        if (this.selectedFile === null) {
            this.props.callback(false);
            return;
        }
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append("file", this.selectedFile);

        // Details of the uploaded file
        // console.log("selected file is ", this.state.selectedFile, "address is ", formData.get("address"));

        // Request to the backend
        const status = service.uploadFile(formData);

        let me = this;
        status
            .then((v) => {
                if (v.toString() === "1") {
                    me.props.callback(true);
                    console.log("Upload file successfully");
                } else {
                    me.props.callback(false);
                    console.error("Upload/Handle file failed");
                }
            })
            .catch(() => {
                console.warn("Confirm whether backend is running");
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
                <button
                    className="mybtn"
                    onClick={() => this.fileInputRef.current.click()}
                >
                    {"上传曲谱"}
                </button>
            </div>
        );
    }
}

export default UploadFile;
