const initialState = {
    employees: [],
    currentEmployee: {},
};

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_EMPLOYEES":
            return { ...state, employees: action.payload };
        case "SET_CURRENT_EMPLOYEE":
            return { ...state, currentEmployee: action.payload };
        case "RESET_CURRENT_EMPLOYEE":
            return { ...state, currentEmployee: {} };
        default:
            return state;
    }
};

export default employeesReducer;
