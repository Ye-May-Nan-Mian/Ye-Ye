import React, { Component } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import store from "../store";
import { chagneImgWidth } from "store/actionCreators";

// import Service from "../Service";

// const service = new Service();

/* BottomBar
 * height: 2vh, width: 100vw
 * background-color: darkColor
 */
export default class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    zoomIn() {
        let newImgWidth = this.state.imgWidth + 10;
        newImgWidth = newImgWidth > 200 ? 200 : newImgWidth;
        const action = chagneImgWidth(newImgWidth);
        store.dispatch(action);
    }

    zoomOut() {
        let newImgWidth = this.state.imgWidth - 10;
        newImgWidth = newImgWidth < 50 ? 50 : newImgWidth;
        const action = chagneImgWidth(newImgWidth);
        store.dispatch(action);
    }

    render() {
        return (
            <div className={`${"bottombar"} ${"dark-background-color"}`}>
                <p className={`${"bottombar-name"} ${"white-color"}`}>
                    {this.state.fileName}
                </p>
                <MinusOutlined
                    className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                    onClick={this.zoomOut}
                />
                <PlusOutlined
                    className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                    onClick={this.zoomIn}
                />
            </div>
        );
    }
}
