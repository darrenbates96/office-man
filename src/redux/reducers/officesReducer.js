const initialState = {
    offices: [],
    currentOffice: {},
    currentOfficeId: "",
    inProgress: false,
    actionSuccess: false,
};

const officesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_OFFICES":
            return { ...state, offices: action.payload };
        case "SET_CURRENT_OFFICE":
            return { ...state, currentOffice: action.payload };
        case "RESET_CURRENT_OFFICE":
            return { ...state, currentOffice: {} };
        case "SET_CURRENT_OFFICE_ID":
            return { ...state, currentOfficeId: action.payload };
        case "RESET_CURRENT_OFFICE_ID":
            return { ...state, currentOfficeId: "" };
        case "IN_PROGRESS":
            return { ...state, inProgress: true };
        case "NOT_IN_PROGRESS":
            return { ...state, inProgress: false };
        case "ACTION_SUCCESS":
            return { ...state, actionSuccess: true };
        case "RESET_ACTION_SUCCESS":
            return { ...state, actionSuccess: false };
        default:
            return state;
    }
};

export default officesReducer;
