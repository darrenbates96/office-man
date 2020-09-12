import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit, MdRemoveCircle } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import "../../styles/OfficeListItem.css";

const OfficeListItem = ({ info, toggleModal, setAction, dispatch }) => {
    // Object destructuring
    const { name, location, email, no_occupants, tell_no, id } = info;

    // State instantiation for submenu
    const [subMenu, setSubMenu] = useState(false);

    // Function to change sub menu button
    // according to subMenu component state
    const renderButton = () => {
        if (subMenu) {
            return (
                <AiOutlineClose
                    color={"#c7c7c7"}
                    style={{
                        position: "absolute",
                        padding: "10px",
                        top: "0",
                        right: "0",
                    }}
                    onClick={() => {
                        dispatch({ type: "RESET_CURRENT_OFFICE_ID" });
                        setSubMenu(false);
                    }}
                />
            );
        } else {
            return (
                <HiOutlineDotsVertical
                    color={"#c7c7c7"}
                    style={{
                        position: "absolute",
                        padding: "10px",
                        top: "0",
                        right: "0",
                    }}
                    onClick={() => {
                        dispatch({
                            type: "SET_CURRENT_OFFICE_ID",
                            payload: id,
                        });
                        setSubMenu(true);
                    }}
                />
            );
        }
    };

    // Function to open modal on parent
    // home pge and pass in the type of
    // modal
    const subMenuHelper = (type) => {
        setAction(type);
        setSubMenu(false);
        toggleModal();
    };

    // Function to render sub menu based on
    // the component state subMenu
    const renderSubMenu = () => {
        if (subMenu) {
            return (
                <div className='office-submenu-container'>
                    <div
                        className='flex row align-center justify-sb'
                        onClick={() => subMenuHelper("Edit")}
                    >
                        <p>Edit</p>
                        <MdEdit color={"#c7c7c7"} size={"20px"} />
                    </div>
                    <div
                        className='flex row align-center justify-sb'
                        onClick={() => subMenuHelper("Delete")}
                    >
                        <p>Remove</p>
                        <MdRemoveCircle color={"#c7c7c7"} size={"20px"} />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className='oli-container flex column align-center justify-end'>
            <div className='oli-item flex row'>
                {renderButton()}
                {renderSubMenu()}
                <div className='oli-icon flex column justify-center align-center'>
                    <FiUsers color={"#ffffff"} size={"30px"} />
                    <p>{`00/${no_occupants}`}</p>
                </div>
                <Link
                    to={`/office/${id}`}
                    key={id}
                    className='oli-info flex column justify-sb'
                    onClick={() =>
                        dispatch({ type: "SET_CURRENT_OFFICE", payload: info })
                    }
                >
                    <h3>{name}</h3>
                    <p>{location}</p>
                    <div className='oli-info-bottom flex row align-center justify-sb'>
                        <p>{email}</p>
                        <p>
                            <ImPhone
                                color={"#3b3b3b"}
                                size={"10px"}
                                style={{ marginRight: "5px" }}
                            />
                            {tell_no}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

// ##### Redux ##### //

export default connect()(OfficeListItem);
