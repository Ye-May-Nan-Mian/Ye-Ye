import React, { Component } from "react";
import Service from "../Service";
import Webcam from "react-webcam";
const service = new Service();
class Video extends Component {
    cameraOpened = false;
    capture = "";
    constructor(props) {
        super(props);
        // console.log(props.fileUploaded);
        this.state = {
            buttonText: "开启摄像头"
        };
        this.switchCamera = this.switchCamera.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.uploadPic(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    switchCamera() {
        // console.log(this.state.cameraOpened);
        this.cameraOpened = this.cameraOpened === false ? true : false;
        this.setState({
            buttonText: this.cameraOpened ? "已开启摄像头" : "开启摄像头"
        });
    }

    // upload pictures
    uploadPic() {
        console.log(
            "uploadPic...this.cameraOpened:",
            this.cameraOpened,
            ", this.props.fileUploaded:",
            this.props.fileUploaded
        );
        if (!this.cameraOpened || !this.props.fileUploaded) {
            return;
        }
        // I don't have a better way to get webcam...
        // TODO: replace refs with a better way
        this.capture = this.refs.webcam.getScreenshot();
        // console.log(this.capture);
        service.uploadPic(this.capture);
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-primary"
                    onClick={this.switchCamera}
                    style={{ width: "100%" }}
                >
                    {this.state.buttonText}
                </button>
                {this.cameraOpened && (
                    <Webcam
                        audio={false}
                        height={240}
                        mirrored={true}
                        ref="webcam"
                        width={320}
                        videoConstraints={{
                            height: 240,
                            width: 320,
                            facingMode: "user"
                        }}
                        style={{ width: "100%" }}
                    />
                )}
            </div>
        );
    }
}
export default Video;
