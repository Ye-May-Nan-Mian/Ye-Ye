import React, { Component } from "react";
import { List, Image, Drawer } from "antd";
import store from "../store";
import Service from "../Service";
import {
    pushPane,
    switchHistoryPage,
    changeHistory
} from "store/actionCreators";

const service = new Service();

class History extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    // close history page
    onClose() {
        const action = switchHistoryPage(false);
        store.dispatch(action);
    }

    getFile(item) {
        service.getHistoryfile({ idx: item.idx }).then((data) => {
            const action = pushPane({ fileName: item.name, imgs: data.imgs });
            store.dispatch(action);
        });
        this.onClose();
    }

    delFile(value) {
        service.delHistoryfile({ delete_idx: value }).then(() =>
            // get new history from backend
            service.getHistoryall().then((data) => {
                const action = changeHistory(data.files);
                store.dispatch(action);
            })
        );
    }

    render() {
        return (
            <>
                <Drawer
                    title={
                        <p
                            style={{
                                margin: 0,
                                color: this.state.colors[0],
                                fontWeight: 500
                            }}
                        >
                            {this.state.text.history}
                        </p>
                    }
                    placement={"left"}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.historyShow}
                    key={"leftHistory"}
                    mask={true}
                    maskClosable={true}
                    width={"300px"}
                    getContainer={document.getElementById("main-main")}
                    style={{
                        position: "absolute"
                    }}
                    headerStyle={{
                        backgroundColor: this.state.colors[4]
                    }}
                    bodyStyle={{ backgroundColor: this.state.colors[4] }}
                >
                    {/* TODO: modify empty info */}
                    <List
                        className={`${"history-list"} ${"white-color"}`}
                        bordered
                        dataSource={this.state.history}
                        locale={{ emptyText: this.state.text.historyEmpty }}
                        renderItem={(item) => (
                            <List.Item
                                className={`${"history-list-item"} ${"white-color"}`}
                            >
                                <Image
                                    className={`${"history-img"}`}
                                    src={item.img}
                                />
                                <p
                                    className={`${"history-title"} ${"darker-background-color"}`}
                                    onClick={() => {
                                        this.getFile({
                                            idx: item.idx,
                                            name: item.name
                                        });
                                    }}
                                >
                                    {item.name}
                                </p>
                                <p
                                    className={`${"history-delete"}`}
                                    onClick={() => {
                                        this.delFile(item.idx);
                                    }}
                                >
                                    {this.state.text.delete}
                                </p>
                            </List.Item>
                        )}
                    />
                </Drawer>
            </>
        );
    }
}

export default History;
