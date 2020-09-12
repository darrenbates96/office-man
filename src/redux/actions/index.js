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

// Function creates an id, and that adds new office to the
// firebase 'offices' collection
export const addOfficeAction = (office_info) => async (dispatch) => {
    // Dispatch action to show spinner during function duration
    dispatch({ type: "IN_PROGRESS" });
    // Create random alphanumeric 24 char string
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
    // Add new office to firebase
    await db.collection("offices").doc(rString).set(office_info);
    // The below resets the redux state to what it was pre-action
    dispatch({ type: "ACTION_SUCCESS" });
    dispatch({ type: "NOT_IN_PROGRESS" });
};

// Function edits the values of an existing firebase 'offices' doc
export const editOfficeAction = (office_info) => async (dispatch) => {
    // Dispatch action to show spinner during function duration
    dispatch({ type: "IN_PROGRESS" });
    // Push new values to firebase
    await db.collection("offices").doc(office_info.id).update(office_info);
    // The below resets the redux state to what it was pre-action
    dispatch({ type: "ACTION_SUCCESS" });
    dispatch({ type: "NOT_IN_PROGRESS" });
};

// Function deletes an office from the firebase 'offices' collection
export const deleteOfficeAction = (id) => async (dispatch) => {
    // Dispatch action to show spinner during function duration
    dispatch({ type: "IN_PROGRESS" });
    // Delete the doc from firebase
    await db.collection("offices").doc(id).delete();
    // The below resets the redux state to what it was pre-action
    dispatch({ type: "ACTION_SUCCESS" });
    dispatch({ type: "NOT_IN_PROGRESS" });
};
