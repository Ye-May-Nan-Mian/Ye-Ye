import * as Type from "./actionTypes";

export const switchCameraState = (value) => ({
    type: Type.SWITCH_CAMERA_STATE,
    value: value
});

export const changeFile = (value) => ({
    type: Type.CHANGE_FILE,
    value: value
});

export const changeFileName = (value) => ({
    type: Type.CHANGE_FILE_NAME,
    value: value
});

export const chagneImgWidth = (value) => ({
    type: Type.CHANGE_IMG_WIDTH,
    value: value
});

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
