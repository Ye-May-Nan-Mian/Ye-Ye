import * as Type from "./actionTypes";
const defaultState = {
    // open or close camera
    cameraOpened: false,
    // pages list, incluse fileImgs and fileName
    // [{fileName: string, fileImgs: [], key: string}]
    panes: [],
    activePane: "",
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
    colors: ["#FFFFFF", "#373B43", "#72767E", "#535860", "#1D212A", "#141D2F"],
    // menu stretch
    toolCollapsed: true
};

// action = {type: string, value: any}
export default (state = defaultState, action = { type: "noneType" }) => {
    let newState = "";
    switch (action.type) {
        // camera open/close
        case Type.SWITCH_CAMERA_STATE:
            newState = JSON.parse(JSON.stringify(state));
            newState.cameraOpened = action.value;
            return newState;
        // panes of page
        case Type.PUSH_PANE:
            newState = JSON.parse(JSON.stringify(state));
            newState.panes = action.value.panes;
            newState.activePane = action.value.activePane;
            newState.imgWidth = action.value.imgWidth;
            return newState;
        case Type.POP_PANE:
            newState = JSON.parse(JSON.stringify(state));
            newState.panes = action.value.panes;
            newState.activePane = action.value.activePane;
            return newState;
        case Type.CHANGE_ACTIVE_PANE:
            newState = JSON.parse(JSON.stringify(state));
            newState.activePane = action.value;
            return newState;
        case Type.CHANGE_IMG_WIDTH:
            newState = JSON.parse(JSON.stringify(state));
            newState.imgWidth = action.value;
            return newState;
        // history page
        case Type.SWITCH_HISTORY_PAGE:
            newState = JSON.parse(JSON.stringify(state));
            newState.historyShow = action.value;
            return newState;
        case Type.CHANGE_HISTORY:
            newState = JSON.parse(JSON.stringify(state));
            newState.history = action.value;
            return newState;
        // introduce page
        case Type.SWITCH_INTRO_PAGE:
            newState = JSON.parse(JSON.stringify(state));
            newState.introShow = action.value;
            return newState;
        case Type.CHANGE_COLOR:
            newState = JSON.parse(JSON.stringify(state));
            newState.colors = action.value;
            return newState;
        // menu state
        case Type.SWITCH_TOOL:
            newState = JSON.parse(JSON.stringify(state));
            newState.toolCollapsed = action.value;
            return newState;
        default:
            return state;
    }
};
