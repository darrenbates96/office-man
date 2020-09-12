import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import {
    addOfficeAction,
    editOfficeAction,
    deleteOfficeAction,
} from "../../redux/actions";
import ColorPicker from "./ColorPicker";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../../styles/OfficeModalForm.css";

const OfficeModalForm = ({
    action,
    addOffice,
    inProgress,
    offices,
    currentOfficeId,
    editOffice,
    deleteOffice,
}) => {
    // Create variables to be filled by the selected office
    // in the case of 'Edit'
    let existing_name = "";
    let existing_email = "";
    let existing_tell = "";
    let existing_address = "";
    let existing_occupants = "";
    let existing_color = "";
    // Set states equal to current values as they
    // exist on firebase
    if (action === "Edit") {
        let currentOffice;
        for (let i = 0; i < offices.length; i++) {
            if (offices[i].id === currentOfficeId) {
                currentOffice = offices[i];
            }
        }
        existing_name = currentOffice.name;
        existing_email = currentOffice.email;
        existing_tell = currentOffice.tell_no;
        existing_address = currentOffice.location;
        existing_occupants = currentOffice.no_occupants;
        existing_color = currentOffice.color;
    }

    // State instantiation for form
    const [name, setName] = useState(existing_name);
    const [email, setEmail] = useState(existing_email);
    const [tell, setTell] = useState(existing_tell);
    const [address, setAddress] = useState(existing_address);
    const [occupants, setOccupants] = useState(existing_occupants);
    const [color, setColor] = useState(existing_color);

    // Function to fetch color from child
    // component <ColorPicker />
    const getColor = (col) => {
        setColor(col);
    };

    // Submit helper function. Creates object
    // and passes it into action creator
    const submitHelper = () => {
        if (action === "Delete") {
            deleteOffice(currentOfficeId);
        } else {
            let office_info = {
                name: name,
                email: email,
                tell_no: tell,
                location: address,
                no_occupants: occupants,
                color: color,
            };
            if (action === "Add") {
                addOffice(office_info);
            } else {
                office_info.id = currentOfficeId;
                editOffice(office_info);
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
                        <h1 className='form-h1'>Remove Office</h1>
                        <h3 className='form-h3'>
                            Are you sure you want to <span>Remove</span>
                        </h3>
                        <h2 className='form-h2'>Office Name</h2>
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
                        <h1 className='form-h1'>{action} Office</h1>
                        <form className='flex column align-center'>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Office Name'
                            />
                            <input
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email Address'
                            />
                            <input
                                type='text'
                                value={tell}
                                onChange={(e) => setTell(e.target.value)}
                                placeholder='Office tell'
                            />
                            <input
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Address'
                            />
                            <input
                                type='text'
                                value={occupants}
                                onChange={(e) => setOccupants(e.target.value)}
                                placeholder='Max number of occupants'
                            />
                        </form>
                        <ColorPicker
                            passColor={getColor}
                            existingColor={existing_color}
                        />
                        <button className='form-button' onClick={submitHelper}>
                            Save Office
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
        offices: state.offices.offices,
        currentOfficeId: state.offices.currentOfficeId,
    };
};

// Create component useable action/s
const mapDispatchToProps = (dispatch) => {
    return {
        addOffice: (office_info) => {
            dispatch(addOfficeAction(office_info));
        },
        editOffice: (office_info) => {
            dispatch(editOfficeAction(office_info));
        },
        deleteOffice: (id) => {
            dispatch(deleteOfficeAction(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficeModalForm);
