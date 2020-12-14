import React, { Component } from "react";
import { List, Image, Drawer } from "antd";
import store from "../store";
import Service from "../Service";
import {
    switchHistoryPage,
    changeFile,
    changeFileName,
    chagneImgWidth,
    changeHistory
} from "store/actionCreators";

const service = new Service();

class History extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.getFile = this.getFile.bind(this);
        this.delFile = this.delFile.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    onClose() {
        const action = switchHistoryPage(false);
        store.dispatch(action);
    }

    getFile(value) {
        service.getHistoryfile({ idx: value }).then((data) => {
            const action1 = changeFile(data.imgs);
            store.dispatch(action1);
            const action2 = changeFileName(value);
            store.dispatch(action2);
            const action3 = chagneImgWidth(90);
            store.dispatch(action3);
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
                            {"历史记录"}
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
                    <List
                        className={`${"history-list"} ${"white-color"}`}
                        bordered
                        dataSource={this.state.history}
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
                                        this.getFile(item.idx);
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
                                    {"  删除"}
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
