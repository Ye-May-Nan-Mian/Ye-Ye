import React, { Component } from "react";
import axios from "axios";
import CustomersService from "./CustomersService";

const customersService = new CustomersService();

class Upload extends Component {
    constructor(props) {
        this.state = { selectedFile: (String = null) };
    }

    // On file select (from the pop up)
    onFileChange = (event) => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        return this.state.selectedFile ? (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {this.state.selectedFile.name}</p>
                <p>File Type: {this.state.selectedFile.type}</p>
                <p>
                    Last Modified:{" "}
                    {this.state.selectedFile.lastModifiedDate.toDateString()}
                </p>
            </div>
        ) : (
            <div>
                <br />
                <h4>Choose before Pressing the Upload button</h4>
            </div>
        );
    };

    render() {
        return (
            <div>
                <h1>Upload component</h1>
                <input type="file" onChange={this.onFileChange}></input>
                <button onClick={this.onFileUpload}>上传文件</button>
                {this.fileData()}
            </div>
        );
    }
}

export default Upload;
