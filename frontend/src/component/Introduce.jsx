import React, { Component } from "react";
import { Drawer, Timeline } from "antd";
import store from "../store";
import { switchIntroPage } from "store/actionCreators";

class Introduce extends Component {
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

    onClose() {
        const action = switchIntroPage(false);
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
                            {this.state.text.about}
                        </p>
                    }
                    placement={"left"}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.introShow}
                    key={"leftHistory"}
                    mask={true}
                    maskClosable={true}
                    width={"300px"}
                    getContainer={false}
                    style={{
                        position: "absolute"
                    }}
                    headerStyle={{
                        backgroundColor: this.state.colors[4]
                    }}
                    bodyStyle={{ backgroundColor: this.state.colors[4] }}
                >
                    <Timeline
                        className={`${"white-color"}`}
                        pending="后续期待您的反馈..."
                        reverse={false}
                    >
                        <Timeline.Item className={`${"white-color"}`}>
                            2020-09-22 <b>夜寐男♂眠</b>团队成立，<b>页页</b>
                            开发提上日程
                        </Timeline.Item>
                        <Timeline.Item className={`${"white-color"}`}>
                            2020-11-07 页页 0.1.2 版本正式发布
                        </Timeline.Item>
                    </Timeline>
                </Drawer>
            </>
        );
    }
}

export default Introduce;
