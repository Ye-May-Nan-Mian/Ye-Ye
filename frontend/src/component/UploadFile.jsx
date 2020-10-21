import React, { Component } from "react";
import Service from "../Service";
import "../App.css";

const service = new Service();

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedFile: null };
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    // On file select (from the pop up)
    onFileChange(event) {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        this.props.callback(false);
        console.log(event.target.files[0]);
    }

    // On file upload (click the upload button)
    onFileUpload() {
        if (this.state.selectedFile === null) {
            return;
        }
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append("file", this.state.selectedFile);

        // Details of the uploaded file
        // console.log("selected file is ", this.state.selectedFile, "address is ", formData.get("address"));

        // Request to the backend
        const status = service.uploadFile(formData);

        let me = this;
        status.then((v) => {
            if (v.toString() === "1") {
                me.props.callback(true);
            } else {
                me.props.callback(false);
                console.error("Upload/Handle file failed");
            }
        });
    }

    render() {
        return (
            <div className="uploadfile">
                <input
                    type="file"
                    multiple={false}
                    onChange={this.onFileChange}
                />
                <button onClick={this.onFileUpload}>{"上传曲谱"}</button>
            </div>
        );
    }
}

export default UploadFile;
