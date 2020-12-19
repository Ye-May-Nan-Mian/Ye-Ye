import React, { Component } from "react";
import { Image, Tabs } from "antd";
import store from "../store";
import Logo from "./svg/Logo";
import { popPane, changeActivePane } from "store/actionCreators";

const { TabPane } = Tabs;

/* Page
 * height: 100vh - 50px, width: 100vw - 200px
 * background-color: lighterColor
 */
export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.pageimg = React.createRef();
        this.storageChange = this.storageChange.bind(this);
        this.scrollPage = this.scrollPage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.remove = this.remove.bind(this);
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

    onChange(activePane) {
        const action = changeActivePane(activePane);
        store.dispatch(action);
    }

    onEdit(targetKey, action) {
        // here, action only contains "remove"
        this[action](targetKey);
    }

    remove(targetKey) {
        const action = popPane(targetKey);
        store.dispatch(action);
    }

    render() {
        return (
            <div className={`${"page"} ${"dark-border"}`} key={"pageimgs"}>
                {this.state.panes.length > 0 ? (
                    /* some pictures */
                    <Tabs
                        // className="page-tabs"
                        hideAdd
                        type="editable-card"
                        size="small"
                        onChange={this.onChange}
                        activeKey={this.state.activePane}
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map((pane) => (
                            <TabPane
                                className="page"
                                tab={pane.fileName}
                                key={pane.key}
                                closable={true}
                                ref={this.pageimg}
                            >
                                {pane.fileImgs.map((img, index) => {
                                    // TODO: width of images
                                    return (
                                        <Image
                                            className="page-img"
                                            key={"fileimg" + index}
                                            alt={"小君没能加载出文件Orz"}
                                            src={img}
                                            preview={false}
                                            width={
                                                "calc(" +
                                                this.state.imgWidth.toString() +
                                                "vw + 10vw - 200px)"
                                            }
                                        />
                                    );
                                })}
                            </TabPane>
                        ))}
                    </Tabs>
                ) : (
                    // If there is no file to be displayed, show logo
                    <Logo
                        height={"calc(100vh - 52px)"}
                        width={"calc(100vw - 202px)"}
                        outterColor={"base-logo"}
                        innerColor={"lighter-logo"}
                    />
                )}
            </div>
        );
    }
}
