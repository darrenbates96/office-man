const initialState = {
    employees: [],
};

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_EMPLOYEES":
            return { ...state, employees: action.payload };
        default:
            return state;
    }
};

export default employeesReducer;
