import React, { Component } from "react";
import { Slider, Switch } from "antd";
import Service from "../Service";
import Webcam from "react-webcam";
import "../App.css";
const service = new Service();
class Video extends Component {
    cameraOpened = false;
    capture = "";
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "开启摄像头"
        };
        // a ref to Webcam component
        this.webcam = React.createRef();
        this.changeInterval = this.changeInterval.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.uploadPic(), 320);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeInterval(t) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.uploadPic(), t);
    }

    switchCamera() {
        // console.log(this.state.cameraOpened);
        this.cameraOpened = this.cameraOpened === false ? true : false;
        this.setState({
            buttonText: this.cameraOpened ? "已开启摄像头" : "开启摄像头"
        });
        // Uncomment the following line, you can see the demo of
        // page turning with pressing the camera switch
        // this.props.pageDown();
    }

    // upload pictures
    uploadPic() {
        // console.log("uploadPic...this.cameraOpened:", this.cameraOpened);
        if (!this.cameraOpened) {
            return;
        }
        this.capture = this.webcam.current.getScreenshot();
        // console.log(this.capture);
        const turnPage = service.uploadPic(this.capture);

        let me = this;
        turnPage.then((v) => {
            // turn page up/down
            // 0: page up?
            // 1: don't page up/down
            // 2: page down?
            console.log("turn page? ", v);
            if (v.toString() === "0") {
                me.props.pageUp();
            } else if (v.toString() === "2") {
                me.props.pageDown();
            }
        });
    }

    render() {
        return (
            <div className="video">
                <Switch
                    checkedChildren="已开启摄像头"
                    unCheckedChildren="已关闭摄像头"
                    defaultChecked={false}
                    onChange={this.switchCamera}
                    style={{ margin: 5 }}
                />
                <Slider
                    range={false}
                    defaultValue={150}
                    min={100}
                    max={330}
                    step={10}
                    onChange={(t) => this.changeInterval(t)}
                    tipFormatter={() => {
                        return "往左移动，人脸识别更快哦";
                    }}
                    tooltipPlacement={"bottom"}
                    style={{ width: "75%" }}
                />
                {this.cameraOpened && (
                    <Webcam
                        className="video-webcam"
                        audio={false}
                        mirrored={true}
                        ref={this.webcam}
                        imageSmoothing={true}
                        screenshotFormat={"image/jpeg"}
                        screenshotQuality={1}
                        minScreenshotHeight={300}
                        minScreenshotWidth={300}
                        videoConstraints={{
                            height: 300,
                            width: 300,
                            facingMode: "user"
                        }}
                    />
                )}
            </div>
        );
    }
}
export default Video;
