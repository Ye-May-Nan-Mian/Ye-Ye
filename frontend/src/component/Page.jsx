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
        this.state.pane[0].paneRef.current.scrollBy({
            top: increment,
            left: 0,
            behavior: "smooth"
        });
    }

    // change among files(TabPanes)
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
            <div
                className={`${"page"} ${"card-container"} ${"dark-border"}`}
                key={"pageimgs"}
            >
                {this.state.panes.length > 0 ? (
                    /* some pictures */
                    <Tabs
                        hideAdd
                        type="editable-card"
                        size="small"
                        onChange={this.onChange}
                        activeKey={this.state.activePane}
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map((pane) => (
                            <TabPane
                                tab={pane.fileName}
                                key={pane.key}
                                closable={true}
                                ref={pane.paneRef}
                            >
                                {pane.fileImgs.map((img, index) => {
                                    // TODO: width of images
                                    // 212 = 200 tools + 2 border + 10 scrollbar
                                    return (
                                        <Image
                                            className="page-img"
                                            key={pane.key + index}
                                            alt={this.state.text.fileLoadError}
                                            src={img}
                                            preview={false}
                                            width={
                                                "calc(" +
                                                this.state.imgWidth.toString() +
                                                "vw - 212px)"
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
