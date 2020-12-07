import React, { Component } from "react";
import { List, Image, Drawer } from "antd";
import store from "../store";
import Service from "../Service";
import { changeHistory } from "store/actionCreators";
import { switchHistoryPage } from "store/actionCreators";

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
        service.getHistoryall().then((data) => {
            const action = changeHistory(data);
            store.dispatch(action);
        });
    }

    onClose() {
        const action = switchHistoryPage(false);
        store.dispatch(action);
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
                                onClick={() => {
                                    // service.getHistoryfile()
                                    this.onClose();
                                }}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <Image src={item.img} />
                                {item.name}
                            </List.Item>
                        )}
                    />
                </Drawer>
            </>
        );
    }
}

export default History;
