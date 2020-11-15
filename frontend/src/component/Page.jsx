import React, { Component } from "react";
import { Image } from "antd";
import "../App.css";

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
        this.pageimg = React.createRef();
        this.scrollPage = this.scrollPage.bind(this);
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
    render() {
        // console.log(this.props.fileImgs.length);
        return this.props.fileImgs.length > 0 ? (
            <div className="page" key={"pageimgs"} ref={this.pageimg}>
                {/* some small pictures */}
                {this.props.fileImgs.map((img, index) => {
                    return (
                        <Image
                            className="page-img"
                            key={"fileimg" + index}
                            alt={"小君没能加载出文件Orz"}
                            src={img}
                            preview={false}
                        />
                    );
                })}
            </div>
        ) : null; // TODO: we can add some components to here if we want
    }
}
