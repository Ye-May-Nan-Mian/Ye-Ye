import React, { Component } from "react";
import Page from "./Page";
import UploadFile from "./UploadFile";
import Video from "./Video";
import "../App.css";

class Main extends Component {
    constructor(props) {
        super(props);
        // a ref to Page component
        this.page = React.createRef();
        this.getFile = this.getFile.bind(this);
        this.pageUp = this.pageUp.bind(this);
        this.pageDown = this.pageDown.bind(this);
        this.state = {
            fileImgs: []
        };
    }

    // ssend (file to) images to page.jsx
    getFile(imgs) {
        this.setState({
            fileImgs: imgs
        });
    }

    // Video use pageUp & pageDown to turn page
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
                    <UploadFile getFile={this.getFile} />
                    <Video pageUp={this.pageUp} pageDown={this.pageDown} />
                </div>
                <Page ref={this.page} fileImgs={this.state.fileImgs} />
            </div>
        );
    }
}

export default Main;
