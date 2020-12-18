import * as Type from "./actionTypes";
import { POP_PANE } from "./actionTypes";
import store from "./index";

export const switchCameraState = (value) => ({
    type: Type.SWITCH_CAMERA_STATE,
    value: value
});

export const pushPane = (pushItem) => {
    const activeKey = Math.random().toString();
    const newPanes = [...store.getState().panes];
    newPanes.push({
        fileName: pushItem.fileName,
        fileImgs: pushItem.imgs,
        key: activeKey
    });
    return {
        type: Type.PUSH_PANE,
        value: {
            panes: newPanes,
            activePane: activeKey,
            imgWidth: 90
        }
    };
};

export const popPane = (targetKey) => {
    let activeKey = store.getState().actionPane;
    let lastIndex = -1;
    store.getState().panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
    });
    const newPanes = store
        .getState()
        .panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
            activeKey = newPanes[lastIndex].key;
        } else {
            activeKey = newPanes[0].key;
        }
    }
    return {
        type: POP_PANE,
        value: {
            panes: newPanes,
            activePane: activeKey
        }
    };
};

export const changeActivePane = (value) => ({
    type: Type.CHANGE_ACTIVE_PANE,
    value: value
});

// can be smoother
export const chagneImgWidth = (value) => {
    let newImgWidth = store.getState().imgWidth + value;
    newImgWidth = newImgWidth > 200 ? 200 : newImgWidth;
    newImgWidth = newImgWidth < 50 ? 50 : newImgWidth;
    return {
        type: Type.CHANGE_IMG_WIDTH,
        value: newImgWidth
    };
};

export const switchHistoryPage = (value) => ({
    type: Type.SWITCH_HISTORY_PAGE,
    value: value
});

export const changeHistory = (value) => ({
    type: Type.CHANGE_HISTORY,
    value: value
});

export const switchIntroPage = (value) => ({
    type: Type.SWITCH_INTRO_PAGE,
    value: value
});

export const changeColor = (value) => ({
    type: Type.CHANGE_COLOR,
    value: value
});

export const switchTool = () => {
    const lastState = store.getState().toolCollapsed;
    return {
        type: Type.SWITCH_TOOL,
        value: lastState === true ? false : true
    };
};

export const switchLanguage = () => {
    const lastState = store.getState().useZh;
    return {
        type: Type.SWITCH_LANGUAGE,
        value: lastState === true ? false : true
    };
};

export const fullScreen = () => {
    const lastState = store.getState().fullScreened;
    return {
        type: Type.FULL_SCREEN,
        value: lastState === true ? false : true
    };
};
