import React, { Component } from "react";
import Service from "../Service";
import Webcam from "react-webcam";
import store from "../store";

const service = new Service();
const webcamHeight = 256;
const webcamWidth = 256;

/* Video
 * height: 32vh, width: 20vw
 * background-color: darkerColor
 */
export default class Video extends Component {
    capture = "";
    constructor(props) {
        super(props);
        this.state = store.getState();
        // a ref to Webcam component
        this.webcam = React.createRef();
        this.storageChange = this.storageChange.bind(this);
        this.changeInterval = this.changeInterval.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
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
        if (!this.state.cameraOpened) {
            return;
        }
        this.capture = this.webcam.current.getScreenshot();
        // console.log(this.capture);
        const turnPage = service.uploadPic(this.capture);

        let me = this;
        turnPage
            .then((v) => {
                // turn page up/down
                // 0: page up
                // 1: don't page up/down
                // 2: page down
                // console.log("turn page? ", v);
                if (v.toString() === "0") {
                    // scroll up
                    me.props.pageScroll(-1);
                } else if (v.toString() === "2") {
                    // scroll down
                    me.props.pageScroll(1);
                }
            })
            .catch((e) => {
                console.warn("can't turn page in Video.jsx", e);
            });
    }

    render() {
        return (
            <div
                className={`${"video"} ${"darker-background-color"} ${"dark-border"}`}
            >
                {this.state.cameraOpened && (
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
