import firebase from "../../firebase";

// Instantiate database instance
const db = firebase.firestore();

// ###### ACTIONS ###### //

// Function that pulls all office items and their
// id's from firestore 'offices' collection
export const getOfficesAction = () => async (dispatch) => {
    let response = await db.collection("offices").get();
    let resp_array = [];
    response.docs.forEach((item) => {
        let item_object = item.data();
        item_object.id = item.id;
        resp_array.push(item_object);
    });
    dispatch({ type: "GET_OFFICES", payload: resp_array });
};

// Function pulls 'employees' collection from firebase and
// updates redux state accordingly
export const getEmployeesAction = () => async (dispatch) => {
    let response = await db.collection("employees").get();
    let resp_array = [];
    response.docs.forEach((item) => {
        let item_object = item.data();
        item_object.id = item.id;
        resp_array.push(item_object);
    });
    dispatch({ type: "GET_EMPLOYEES", payload: resp_array });
};

// Function that adds a new employee doc to the firebase
// 'employees' collection with the id of the office that
// the user is currently viewing
export const addEmployeeAction = (employee_object) => async (dispatch) => {
    dispatch({ type: "IN_PROGRESS" });
    const randomString = (length, chars) => {
        let result = "";
        for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    };
    let rString = randomString(
        24,
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    await db.collection("employees").doc(rString).set(employee_object);
    dispatch({ type: "ACTION_SUCCESS" });
    dispatch({ type: "NOT_IN_PROGRESS" });
};

// Function creates an id, and that adds new office to the
// firebase 'offices' collection
export const addOfficeAction = (office_info) => async (dispatch) => {
    dispatch({ type: "IN_PROGRESS" });
    const randomString = (length, chars) => {
        let result = "";
        for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    };
    let rString = randomString(
        24,
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    await db.collection("offices").doc(rString).set(office_info);
    dispatch({ type: "ACTION_SUCCESS" });
    dispatch({ type: "NOT_IN_PROGRESS" });
};

// Function edits the values of an existing firebase 'offices' doc
export const editOfficeAction = (office_info) => async (dispatch) => {
    dispatch({ type: "IN_PROGRESS" });
    await db.collection("offices").doc(office_info.id).update(office_info);
    dispatch({ type: "ACTION_SUCCESS" });
    dispatch({ type: "NOT_IN_PROGRESS" });
};

// Function deletes an office from the firebase 'offices' collection
export const deleteOfficeAction = (id) => async (dispatch) => {
    dispatch({ type: "IN_PROGRESS" });
    await db.collection("offices").doc(id).delete();
    dispatch({ type: "ACTION_SUCCESS" });
    dispatch({ type: "NOT_IN_PROGRESS" });
};
