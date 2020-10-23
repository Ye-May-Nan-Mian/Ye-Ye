import React, { Component } from "react";
import Page from "./Page";
import UploadFile from "./UploadFile";
import Video from "./Video";
import "../App.css";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUploaded: false
        };
        // a ref to Page component
        this.page = React.createRef();
        this.changeFileUploaded = this.changeFileUploaded.bind(this);
        this.pageUp = this.pageUp.bind(this);
        this.pageDown = this.pageDown.bind(this);
    }
    // if the file uploaded successfully, then the variable "fileUploaded"
    // will be modified to "true", then "Video" can record face
    changeFileUploaded(flag) {
        this.setState({
            fileUploaded: flag
        });
    }

    pageUp() {
        const selectedImg = this.page.current.state.selectedImg;
        this.page.current.setState({
            selectedImg: selectedImg === 0 ? selectedImg : selectedImg - 1
        });
    }

    pageDown() {
        const selectedImg = this.page.current.state.selectedImg;
        this.page.current.setState({
            selectedImg:
                selectedImg + 1 === this.page.current.pageSize
                    ? selectedImg
                    : selectedImg + 1
        });
    }

    render() {
        return (
            <div className="main">
                <div className="videofile">
                    <UploadFile callback={this.changeFileUploaded} />
                    <Video
                        fileUploaded={this.state.fileUploaded}
                        pageUp={this.pageUp}
                        pageDown={this.pageDown}
                    />
                </div>
                <Page ref={this.page} fileUploaded={this.state.fileUploaded} />
            </div>
        );
    }
}

export default Main;
