import React, { Component } from "react";
import { Image } from "antd";
import store from "../store";

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

    render() {
        return (
            <div
                className={`${"page"} ${"dark-border"}`}
                key={"pageimgs"}
                ref={this.pageimg}
            >
                {
                    this.state.fileImgs.length > 0
                        ? /* some small pictures */
                          this.state.fileImgs.map((img, index) => {
                              return (
                                  <Image
                                      className="page-img"
                                      key={"fileimg" + index}
                                      alt={"小君没能加载出文件Orz"}
                                      src={img}
                                      preview={false}
                                      width={
                                          (
                                              this.state.imgWidth - 21
                                          ).toString() + "vw"
                                      }
                                  />
                              );
                          })
                        : null // TODO: we can add some components to here if we want
                }
            </div>
        );
    }
}
