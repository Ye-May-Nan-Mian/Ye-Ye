import React, { Component } from "react";
import { List, Image, Drawer } from "antd";
import store from "../store";
import Service from "../Service";
import {
    switchHistoryPage,
    changeFile,
    changeFileName,
    chagneImgWidth
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
        service.getHistoryfile({ name: value }).then((data) => {
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
        service.delHistoryfile({ name: value });
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
                    width={"18vw"}
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
                        className={`${"white-color"}`}
                        bordered
                        dataSource={this.state.history}
                        renderItem={(item) => (
                            <List.Item
                                className={`${"white-color"}`}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                {/* TODO: style */}
                                <Image src={item.img} />
                                <p
                                    onClick={() => {
                                        this.getFile(item.name);
                                    }}
                                >
                                    {item.name}
                                </p>
                                <p
                                    onClick={() => {
                                        this.delFile(item.name);
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
