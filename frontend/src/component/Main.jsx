import React, { Component } from "react";
import Page from "./Page";
import UploadFile from "./UploadFile";
import Video from "./Video";
import "../App.css";

class Main extends Component {
    // fileUploaded = false;
    constructor(props) {
        super(props);
        this.state = {
            fileUploaded: true
        };
        this.changeFileUploaded = this.changeFileUploaded.bind(this);
        this.pageUp = this.pageUp.bind(this);
        this.pageDown = this.pageDown.bind(this);
    }
    // if the file uploaded successfully, then the variable "fileUploaded"
    // will be modified to "true", then "Video" can record face
    changeFileUploaded(flag) {
        // this.fileUploaded = true;
        this.setState({
            fileUploaded: flag
        });
    }

    pageUp() {
        // TODO: replace refs with a better way.
        const selectedImg = this.refs.page.state.selectedImg;
        this.refs.page.setState({
            selectedImg: selectedImg === 0 ? selectedImg : selectedImg - 1
        });
    }

    pageDown() {
        // TODO: replace refs with a better way.
        const selectedImg = this.refs.page.state.selectedImg;
        this.refs.page.setState({
            selectedImg:
                selectedImg + 1 === this.refs.page.pageSize
                    ? selectedImg
                    : selectedImg + 1
        });
    }

    render() {
        return (
            <div className="main">
                <div className="videofile">
                    <Video
                        fileUploaded={this.state.fileUploaded}
                        pageUp={this.pageUp}
                        pageDown={this.pageDown}
                    />
                    <UploadFile callback={this.changeFileUploaded} />
                </div>
                <Page ref="page" fileUploaded={this.state.fileUploaded} />
            </div>
        );
    }
}

export default Main;
