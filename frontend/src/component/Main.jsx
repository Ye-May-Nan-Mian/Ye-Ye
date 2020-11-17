import React, { Component } from "react";
import Logo from "./Logo";
import Page from "./Page";
import Video from "./Video";
import Tools from "./Tools";
import BottomBar from "./BottomBar";

export default class Main extends Component {
    constructor(props) {
        super(props);
        // a ref to Video/Page component
        this.video = React.createRef();
        this.page = React.createRef();
        // TODO: Can remember the last theme selected by the user
        // service.getTheme().then((newColor)=>this.changeColor(newColor));
        this.state = {
            // open or close camera
            cameraOpened: false,
            // file to images
            fileImgs: [],
            // show to bottom bar
            fileName: ""
        };
        this.switchCameraState = this.switchCameraState.bind(this);
        this.getFile = this.getFile.bind(this);
        this.changeInterval = this.changeInterval.bind(this);
        this.pageScroll = this.pageScroll.bind(this);
        this.pageZoomIn = this.pageZoomIn.bind(this);
        this.pageZoomOut = this.pageZoomOut.bind(this);
    }

    // camera state: opened / closed
    switchCameraState() {
        const cameraOpened = this.state.cameraOpened;
        this.setState(() => {
            return { cameraOpened: cameraOpened === true ? false : true };
        });
    }

    // video capture speed = 1000 / t fps
    changeInterval(t) {
        this.video.current.changeInterval(t);
    }

    // send (file to) images to page.jsx
    getFile(imgsAndFilename) {
        this.page.current.setState(() => {
            return { imgWidth: 100 };
        });
        this.setState(() => {
            return {
                fileImgs: imgsAndFilename.imgs,
                fileName: "当前文档：" + imgsAndFilename.fileName
            };
        });
    }

    // Video use pageScroll to turn page
    pageScroll(direction = 1) {
        if (this.state.fileImgs.length > 0) {
            this.page.current.scrollPage(direction);
        }
    }

    pageZoomIn() {
        this.page.current.pageZoomIn();
    }

    pageZoomOut() {
        this.page.current.pageZoomOut();
    }

    // left: side area
    // right: page view
    // bottom: bar
    render() {
        return (
            <div className={`${"main"} ${"lighter-background-color"}`}>
                <div className="main-main">
                    <div className="side-area">
                        <Logo />
                        <Video
                            ref={this.video}
                            cameraOpened={this.state.cameraOpened}
                            pageScroll={this.pageScroll}
                        />
                        <Tools
                            switchCameraState={this.switchCameraState}
                            getFile={this.getFile}
                            changeInterval={this.changeInterval}
                        />
                    </div>
                    <Page ref={this.page} fileImgs={this.state.fileImgs} />
                </div>
                <BottomBar
                    fileName={this.state.fileName}
                    zoomIn={this.pageZoomIn}
                    zoomOut={this.pageZoomOut}
                />
            </div>
        );
    }
}
