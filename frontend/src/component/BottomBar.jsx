import React, { Component } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import store from "../store";
import { chagneImgWidth } from "store/actionCreators";

// import Service from "../Service";

// const service = new Service();

/* BottomBar
 * height: 20px, width: 100vw
 * background-color: darkColor
 */
class BottomBar extends Component {
    zoomInOut(value) {
        const action = chagneImgWidth(value);
        store.dispatch(action);
    }

    render() {
        return (
            <div className={`${"bottombar"} ${"dark-background-color"}`}>
                <MinusOutlined
                    className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                    onClick={() => this.zoomInOut(-10)}
                />
                <PlusOutlined
                    className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                    onClick={() => this.zoomInOut(10)}
                />
            </div>
        );
    }
}

export default BottomBar;
