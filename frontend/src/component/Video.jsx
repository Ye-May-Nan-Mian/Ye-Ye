import React, { Component } from "react";
import Service from "../Service";
import Webcam from "react-webcam";
import "../App.css";

const service = new Service();
const webcamHeight = 300;
const webcamWidth = 300;

/* Video
 * height: 32vh, width: 20vw
 * background-color: darkerColor
 */
export default class Video extends Component {
    capture = "";
    constructor(props) {
        super(props);
        // a ref to Webcam component
        this.webcam = React.createRef();
        this.changeInterval = this.changeInterval.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.uploadPic(), 150);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeInterval(t) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.uploadPic(), t);
    }

    // upload pictures
    uploadPic() {
        // console.log("uploadPic...this.cameraOpened:", this.props.cameraOpened);
        if (!this.props.cameraOpened) {
            return;
        }
        this.capture = this.webcam.current.getScreenshot();
        // console.log(this.capture);
        const turnPage = service.uploadPic(this.capture);

        let me = this;
        turnPage.then((v) => {
            // turn page up/down
            // 0: page up
            // 1: don't page up/down
            // 2: page down
            console.log("turn page? ", v);
            if (v.toString() === "0") {
                // scroll up
                me.props.pageScroll(-1);
            } else if (v.toString() === "2") {
                // scroll down
                me.props.pageScroll(1);
            }
        });
    }

    render() {
        return (
            <div className="video" style={{ background: this.props.color }}>
                {this.props.cameraOpened && (
                    <Webcam
                        className="video-webcam"
                        audio={false}
                        mirrored={true}
                        ref={this.webcam}
                        imageSmoothing={true}
                        screenshotFormat={"image/jpeg"}
                        screenshotQuality={1}
                        minScreenshotHeight={webcamHeight}
                        minScreenshotWidth={webcamWidth}
                        videoConstraints={{
                            height: webcamHeight,
                            width: webcamWidth,
                            facingMode: "user"
                        }}
                    />
                )}
            </div>
        );
    }
}
