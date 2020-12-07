import * as Type from "./actionTypes";
const defaultState = {
    // open or close camera
    cameraOpened: false,
    // file to images
    fileImgs: [],
    // show to bottom bar
    fileName: "",
    // page image's width
    imgWidth: 100,
    // whether the history page is displayed
    historyShow: false,
    history: [],
    // whether the introduce page is displayed
    introShow: false,
    // theme colors
    // this can be stored in less
    // but History.Drawer don't support less, so...
    colors: ["#F5FBFF", "#DCEFFD", "#A7D4F4", "#7AB9E6", "#559FD4", "#3583BB"]
};

export default (state = defaultState, action) => {
    let newState = "";
    switch (action.type) {
        case Type.SWITCH_CAMERA_STATE:
            newState = JSON.parse(JSON.stringify(state));
            newState.cameraOpened = action.value;
            return newState;
        case Type.CHANGE_FILE:
            newState = JSON.parse(JSON.stringify(state));
            newState.fileImgs = action.value;
            return newState;
        case Type.CHANGE_FILE_NAME:
            newState = JSON.parse(JSON.stringify(state));
            newState.fileName = action.value;
            return newState;
        case Type.CHANGE_IMG_WIDTH:
            newState = JSON.parse(JSON.stringify(state));
            newState.imgWidth = action.value;
            return newState;
        case Type.SWITCH_HISTORY_PAGE:
            newState = JSON.parse(JSON.stringify(state));
            newState.historyShow = action.value;
            return newState;
        case Type.CHANGE_HISTORY:
            newState = JSON.parse(JSON.stringify(state));
            newState.history = action.value;
            return newState;
        case Type.SWITCH_INTRO_PAGE:
            newState = JSON.parse(JSON.stringify(state));
            newState.introShow = action.value;
            return newState;
        case Type.CHANGE_COLOR:
            newState = JSON.parse(JSON.stringify(state));
            newState.colors = action.value;
            return newState;
        default:
            return state;
    }
};
