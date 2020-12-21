import React, { Component } from "react";
import Service from "../Service";
import Webcam from "react-webcam";
import store from "../store";

const service = new Service();
const webcamHeight = 256;
const webcamWidth = 256;

/* Video
 * height: 200px, width: 200px
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

    findActivePane() {
        var panes = document.getElementsByClassName("yeye-tabs");
        var strRegex = this.state.activePane + "$";
        var re = new RegExp(strRegex);
        var pane;
        Array.prototype.forEach.call(panes, function (element) {
            if (re.test(element.id)) {
                pane = element;
            }
        });
        return pane;
    }

    pageScroll(direction) {
        var pane = this.findActivePane();
        var increment = window.innerHeight * 0.5 * direction;
        pane.scrollBy({
            top: increment,
            left: 0,
            behavior: "smooth"
        });
    }

    // upload pictures
    uploadPic() {
        if (!this.state.cameraOpened) {
            return;
        }
        this.capture = this.webcam.current.getScreenshot();
        // console.log(this.capture);
        const turnPage = service.uploadPic(this.capture);

        turnPage
            .then((v) => {
                // turn page up/down
                // 0: page up
                // 1: don't page up/down
                // 2: page down
                // console.log("turn page? ", v);
                if (v.toString() === "0") {
                    // scroll up
                    this.pageScroll(-1);
                } else if (v.toString() === "2") {
                    // scroll down
                    this.pageScroll(1);
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
