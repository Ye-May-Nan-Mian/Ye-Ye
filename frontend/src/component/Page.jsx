import React, { Component } from "react";
import { Image } from "antd";
import store from "../store";
import Logo from "./Logo";
import { CloseCircleOutlined } from "@ant-design/icons";
import { changeFile, changeFileName } from "store/actionCreators";

/* Page
 * height: 98vh, width: 80vw
 * background-color: lighterColor
 */
export default class Page extends Component {
    // Todo: if we want to support deleting some pictures,
    // maybe we should put "pageSize" in this.state
    pageSize = 0;
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.pageimg = React.createRef();
        this.storageChange = this.storageChange.bind(this);
        this.scrollPage = this.scrollPage.bind(this);
        this.closePage = this.closePage.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    scrollPage(direction = 1) {
        // console.log(increment);
        // TODO: we can let user set "0.4", can be bigger
        const increment = window.innerHeight * direction * 0.4;
        this.pageimg.current.scrollBy({
            top: increment,
            left: 0,
            behavior: "smooth"
        });
    }

    closePage() {
        const action1 = changeFile([]);
        store.dispatch(action1);
        const action2 = changeFileName("");
        store.dispatch(action2);
    }

    render() {
        return (
            <div
                className={`${"page"} ${"dark-border"}`}
                key={"pageimgs"}
                ref={this.pageimg}
            >
                {this.state.fileImgs.length > 0 ? (
                    /* some pictures */
                    this.state.fileImgs.map((img, index) => {
                        return (
                            <Image
                                className="page-img"
                                key={"fileimg" + index}
                                alt={"小君没能加载出文件Orz"}
                                src={img}
                                preview={false}
                                width={
                                    (this.state.imgWidth - 21).toString() + "vw"
                                }
                            />
                        );
                    })
                ) : (
                    <Logo
                        height={"95vh"}
                        width={"78vw"}
                        outterColor={"base-logo"}
                        innerColor={"lighter-logo"}
                    />
                )}
                {this.state.fileImgs.length > 0 ? (
                    <CloseCircleOutlined
                        className={`${"page-close"} ${"pageCloseIcon"}`}
                        onClick={this.closePage}
                    />
                ) : null}
            </div>
        );
    }
}
