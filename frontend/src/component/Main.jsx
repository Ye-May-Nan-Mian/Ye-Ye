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
        this.pageUp = this.pageUp.bind(this);
        this.pageDown = this.pageDown.bind(this);
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
                    <UploadFile />
                    <Video pageUp={this.pageUp} pageDown={this.pageDown} />
                </div>
                <Page ref={this.page} />
            </div>
        );
    }
}

export default Main;
