import React, { Component } from "react";
import Page from "./Page";
import Video from "./Video";
import Tools from "./Tools";
import BottomBar from "./BottomBar";
import History from "./History";
import store from "../store";
import Introduce from "./Introduce";
import MenuBar from "./MenuBar";

class Main extends Component {
    constructor(props) {
        super(props);
        // a ref to Video/Page component
        this.video = React.createRef();
        this.page = React.createRef();
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.changeInterval = this.changeInterval.bind(this);
        this.pageScroll = this.pageScroll.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    // video capture speed = 1000 / t fps
    changeInterval(t) {
        this.video.current.changeInterval(t);
    }

    // Video use pageScroll to turn page
    pageScroll(direction = 1) {
        if (this.state.fileImgs.length > 0) {
            this.page.current.scrollPage(direction);
        }
    }

    // left: side area
    // right: page view
    // bottom: bar
    render() {
        return (
            <div className={`${"main"} ${"lighter-background-color"}`}>
                <MenuBar />
                <div className="main-main" id={"main-main"} key={"main-main"}>
                    <div className="side-area">
                        <Video ref={this.video} pageScroll={this.pageScroll} />
                        <Tools changeInterval={this.changeInterval} />
                    </div>
                    <Page ref={this.page} fileImgs={this.state.fileImgs} />
                    <History />
                    <Introduce />
                </div>
                <BottomBar />
            </div>
        );
    }
}

export default Main;
