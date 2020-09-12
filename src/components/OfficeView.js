import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getEmployeesAction } from "../redux/actions";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Modal from "./Modal";
import EmployeeList from "./partials/EmployeeList";
import "../styles/OfficeView.css";

const OfficeView = ({
    currentOffice,
    employees,
    actionSuccess,
    resetActionSuccess,
    getEmployees,
}) => {
    // Destructure out properties we'll need from
    // from redux state currentOffice
    const { name, location, email, tell_no, no_occupants } = currentOffice;

    // Instantiate state for modal and modal action
    const [modal, setModal] = useState(false);
    const [action, setAction] = useState("Add");

    // ComponentWillMount
    useEffect(() => {
        if (actionSuccess && modal) {
            setModal(false);
            resetActionSuccess();
            getEmployees();
        }
    }, [setModal, getEmployees, modal, resetActionSuccess, actionSuccess]);

    return (
        <div className='officeview-container'>
            {modal ? (
                <Modal
                    toggleModal={() => setModal(!modal)}
                    type='employee'
                    action={action}
                />
            ) : null}
            <div className='of-header flex column justify-sb'>
                <div className='flex row align-center'>
                    <Link to={"/home"}>
                        <BiArrowBack color={"#ffffff"} size={"25px"} />
                    </Link>
                    <h1>{name}</h1>
                </div>
                <p>Address: {location}</p>
                <p>Email: {email}</p>
                <p>Office Tell: {tell_no}</p>
                <p>Max Capacity: {no_occupants}</p>
            </div>
            <EmployeeList
                currentOffice={currentOffice}
                employees={employees}
                toggleModal={() => setModal(!modal)}
                setAction={(e) => setAction(e)}
            />
        </div>
    );
};

// ##### Redux ##### //

// Pull state
const mapStateToProps = (state) => {
    return {
        currentOffice: state.offices.currentOffice,
        employees: state.employees.employees,
        actionSuccess: state.offices.actionSuccess,
    };
};

// Create component useable action/s
const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: () => {
            dispatch(getEmployeesAction());
        },
        resetActionSuccess: () => {
            dispatch({ type: "RESET_ACTION_SUCCESS" });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficeView);
