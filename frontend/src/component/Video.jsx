import React, { Component } from "react";
import Service from "../Service";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";

const service = new Service();
class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraOpened: false,
            buttonText: "开启摄像头"
        };
        this.switchCamera = this.switchCamera.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
    }

    switchCamera() {
        // console.log(this.state.cameraOpened);
        const check = this.state.cameraOpened === false ? true : false;
        this.setState({
            cameraOpened: check,
            buttonText: check ? "已开启摄像头" : "开启摄像头"
        });
    }

    uploadPic() {
        service.uploadPic("");
    }
    // upload pictures
    record() {
        // TODO
        return null;
    }

    stopRecord() {
        // TODO
        return null;
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.switchCamera}>
                    {this.state.buttonText}
                </button>
                {this.state.cameraOpened ? (
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
                {/* {console.log("log in video render")} */}
                {this.props.fileUploaded === true &&
                this.state.cameraOpened === true
                    ? this.record
                    : this.stopRecord}
            </div>
        );
    }
}
export default Video;
