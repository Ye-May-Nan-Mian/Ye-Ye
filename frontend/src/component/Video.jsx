import React, { Component } from "react";
import CustomersService from "./CustomersService";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";

const customersService = new CustomersService();

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: (Boolean = false),
            buttonText: (String = "开启摄像头")
        };
        this.switchCamera = this.switchCamera.bind(this);
    }

    switchCamera() {
        const check = this.state.opened === false;
        this.setState({
            opened: check,
            buttonText: check ? "已开启摄像头" : "开启摄像头"
        });
    }

    render() {
        return (
            <div className="customers--list">
                <button className="btn btn-primary" onClick={this.switchCamera}>
                    {this.state.buttonText}
                </button>
                {this.state.opened ? (
                    <Camera
                        onTakePhoto={(dataUri) => {}}
                        onCameraError={(error) => {}}
                        idealResolution={{ width: 320, height: 240 }}
                        imageCompression={0.5}
                        imageType={IMAGE_TYPES.JPG}
                        isImageMirror={true}
                        onCameraStart={(stream) => {}}
                        onCameraStop={() => {}}
                    />
                ) : null}
            </div>
        );
    }
}
export default Video;
