import React, { Component } from "react";
import Logo from "./Logo";
import Page from "./Page";
import Video from "./Video";
import Tools from "./Tools";
import BottomBar from "./BottomBar";
import "../App.css";

export default class Main extends Component {
    constructor(props) {
        super(props);
        // a ref to Video/Page component
        this.video = React.createRef();
        this.page = React.createRef();
        // TODO: Can remember the last theme selected by the user
        // service.getTheme().then((newColor)=>this.changeColor(newColor));
        this.state = {
            // background color
            whiteColor: "#c1cbe3",
            lightColor: "#9da5b8",
            lighterColor: "#54658e",
            baseColor: "#253869",
            darkerColor: "#081945",
            darkColor: "#010a21",
            // open or close camera
            cameraOpened: false,
            // file to images
            fileImgs: [],
            // show to bottom bar
            fileName: "curDoc.pdf"
        };
        this.changeBackColor = this.changeBackColor.bind(this);
        this.switchCameraState = this.switchCameraState.bind(this);
        this.getFile = this.getFile.bind(this);
        this.changeInterval = this.changeInterval.bind(this);
        this.pageScroll = this.pageScroll.bind(this);
        this.pageZoomIn = this.pageZoomIn.bind(this);
        this.pageZoomOut = this.pageZoomOut.bind(this);
    }

    // set colors of theme by Tools(user)
    // must include six colors:
    // white, light, lighter, base, darker, dark
    changeBackColor(newColor) {
        this.setState(() => {
            return {
                whiteColor: newColor.whiteColor,
                lightColor: newColor.lightColor,
                lighterColor: newColor.lighterColor,
                baseColor: newColor.baseColor,
                darkerColor: newColor.darkerColor,
                darkColor: newColor.darkColor
            };
        });
        // console.log(this.state);
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
    getFile(imgs) {
        this.setState(() => {
            return {
                fileImgs: imgs
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
            <div
                className="main"
                style={{ background: this.state.lighterColor }}
            >
                <div className="main-main">
                    <div className="side-area">
                        <Logo color={this.state.baseColor} />
                        <Video
                            ref={this.video}
                            color={this.state.darkerColor}
                            cameraOpened={this.state.cameraOpened}
                            pageScroll={this.pageScroll}
                        />
                        <Tools
                            color={this.state.baseColor}
                            switchCameraState={this.switchCameraState}
                            getFile={this.getFile}
                            changeBackColor={this.changeBackColor}
                            changeInterval={this.changeInterval}
                        />
                    </div>
                    <Page
                        ref={this.page}
                        color={{
                            lightColor: this.state.lightColor,
                            lighterColor: this.state.lighterColor,
                            darkerColor: this.state.darkerColor
                        }}
                        fileImgs={this.state.fileImgs}
                    />
                </div>
                <BottomBar
                    color={this.state.darkColor}
                    whiteColor={this.state.whiteColor}
                    fileName={this.state.fileName}
                    zoomIn={this.pageZoomIn}
                    zoomOut={this.pageZoomOut}
                />
            </div>
        );
    }
}
