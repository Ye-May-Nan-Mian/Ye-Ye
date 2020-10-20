import React, { Component } from "react";
import Service from "../Service";

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
    }

    // On file upload (click the upload button)
    onFileUpload() {
        if (this.state.selectedFile === null) {
            return;
        }
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "sheet",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object

        const status = service.uploadFile(formData);
        if (status === "1") {
            this.props.callback();
        }
    }

    render() {
        return (
            <div>
                <input
                    type="file"
                    onChange={this.onFileChange}
                    style={{ height: 100 }}
                />
                <button onClick={this.onFileUpload} style={{ height: 100 }}>
                    {"上传曲谱"}
                </button>
            </div>
        );
    }
}

export default UploadFile;
