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
    }

    // On file upload (click the upload button)
    onFileUpload() {
        if (this.state.selectedFile === null) {
            return;
        }
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append( "name", this.state.selectedFile.name);
        formData.append( "address", "???");
        
        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request to the backend
        const status = service.uploadFile(formData);

        let me = this
        status.then(function(v){

            if (v == "1") {
                me.props.callback(true);
            } else {
                me.props.callback(false);
                console.error("Upload/Handle file failed");
            }
        })
    }

    render() {
        return (
            <div className="uploadfile">
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>{"上传曲谱"}</button>
            </div>
        );
    }
}

export default UploadFile;
