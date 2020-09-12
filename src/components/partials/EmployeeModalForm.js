import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { addEmployeeAction } from "../../redux/actions";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../../styles/EmployeeModalForm.css";

const EmployeeModalForm = ({
    action,
    currentOffice,
    addEmployee,
    inProgress,
}) => {
    // State instantiation for form inputs
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    // Submit Helper function
    const submitHelper = () => {
        let employee_object = {
            name: `${fName} ${lName}`,
            office_id: currentOffice.id,
        };
        addEmployee(employee_object);
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
                        <h2 className='form-h2'>Staff Name</h2>
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
                            />
                            <input
                                type='text'
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                                placeholder='Last Name'
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
    };
};

// Create component useable action/s
const mapDispatchToProps = (dispatch) => {
    return {
        addEmployee: (employee_object) => {
            dispatch(addEmployeeAction(employee_object));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModalForm);
