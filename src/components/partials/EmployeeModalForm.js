import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import {
    addEmployeeAction,
    editEmployeeAction,
    deleteEmployeeAction,
} from "../../redux/actions";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../../styles/EmployeeModalForm.css";

const EmployeeModalForm = ({
    action,
    currentOffice,
    currentEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,
    inProgress,
}) => {
    // Create variables to be filled by the selected employee
    // in the case of 'Edit'
    let existing_fname = "";
    let existing_lname = "";
    // Set states equal to current values as they
    // exist on firebase
    if (action === "Edit") {
        let split_names = currentEmployee.name.split(" ");
        existing_fname = split_names[0];
        existing_lname = split_names[1];
    }

    // State instantiation for form inputs
    const [fName, setFName] = useState(existing_fname);
    const [lName, setLName] = useState(existing_lname);
    // State for form error handling
    const [firstMissing, setFirstMissing] = useState("");
    const [lastMissing, setLastMissing] = useState("");

    // If missing field is filled, remove the
    // 'missing' styling
    if (firstMissing && fName) {
        setFirstMissing("");
    }
    if (lastMissing && lName) {
        setLastMissing("");
    }

    // Submit Helper function
    const submitHelper = () => {
        if (action === "Delete") {
            deleteEmployee(currentEmployee.id);
        } else {
            if (fName && lName) {
                let employee_object = {
                    name: `${fName} ${lName}`,
                    office_id: currentOffice.id,
                };
                if (action === "Add") {
                    addEmployee(employee_object);
                } else {
                    employee_object.id = currentEmployee.id;
                    editEmployee(employee_object);
                }
            } else {
                if (!fName) {
                    setFirstMissing("missing");
                }
                if (!lName) {
                    setLastMissing("missing");
                }
            }
        }
    };

    // Function that renders content based on the
    // inProgress state brought in from redux store
    const renderContent = () => {
        if (!inProgress) {
            if (action === "Delete") {
                return (
                    <Fragment>
                        <h1 className='form-h1'>Remove Staff</h1>
                        <h3 className='form-h3'>
                            Are you sure you want to <span>Remove</span>
                        </h3>
                        <h2 className='form-h2'>{currentEmployee.name}</h2>
                        <button
                            className='form-button red'
                            onClick={submitHelper}
                        >
                            Remove
                        </button>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <h1 className='form-h1'>{action} Staff</h1>
                        <form className='flex column align-center'>
                            <input
                                type='text'
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                                placeholder='First Name'
                                className={firstMissing}
                            />
                            <input
                                type='text'
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                                placeholder='Last Name'
                                className={lastMissing}
                            />
                        </form>
                        <button className='form-button' onClick={submitHelper}>
                            Save Staff
                        </button>
                    </Fragment>
                );
            }
        } else {
            return (
                <div className='fill-modal flex justify-center align-center'>
                    <ScaleLoader />
                </div>
            );
        }
    };

    return <Fragment>{renderContent()}</Fragment>;
};

// ##### Redux ##### //

// Pull state
const mapStateToProps = (state) => {
    return {
        inProgress: state.offices.inProgress,
        currentOffice: state.offices.currentOffice,
        currentEmployee: state.employees.currentEmployee,
    };
};

// Create component useable action/s
const mapDispatchToProps = (dispatch) => {
    return {
        addEmployee: (employee_object) => {
            dispatch(addEmployeeAction(employee_object));
        },
        editEmployee: (employee_object) => {
            dispatch(editEmployeeAction(employee_object));
        },
        deleteEmployee: (employee_id) => {
            dispatch(deleteEmployeeAction(employee_id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModalForm);
