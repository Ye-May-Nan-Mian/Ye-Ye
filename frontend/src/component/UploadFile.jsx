import React, { Component } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Service from "../Service";
import store from "../store";
import { pushPane } from "store/actionCreators";

const service = new Service();

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.onFileChange = this.onFileChange.bind(this);
    }

    updatePage(pushItem) {
        const action = pushPane(pushItem);
        store.dispatch(action);
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
                if (v && v.imgs && v.imgs.length > 0) {
                    // send (file to) images to page.jsx
                    this.updatePage({
                        fileName: this.selectedFile[0].name,
                        imgs: v.imgs
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
            <div
                className={`${"tool-icon"} ${"toolIcon"}`}
                onClick={() => this.fileInputRef.current.click()}
            >
                <UploadOutlined className={`${"inOutlinedIcon"}`} />
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
            </div>
        );
    }
}

export default UploadFile;
