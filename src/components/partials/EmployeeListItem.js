import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit, MdRemoveCircle } from "react-icons/md";
import "../../styles/EmployeeListItem.css";

const EmployeeListItem = ({ name, toggleModal, setAction }) => {
    // State instantiation for submenu
    const [subMenu, setSubMenu] = useState(false);

    // Function to handle sub menu actions being clicked
    const subMenuAction = (action) => {
        setAction(action);
        setSubMenu(false);
        toggleModal();
    };

    // Function to help render content based on component
    // subMenu state
    const renderContent = () => {
        if (!subMenu) {
            return (
                <div className='flex row align-center space-between'>
                    <div className='eli-icon flex align-center justify-center'>
                        <AiOutlineUser color={"#ffffff"} />
                    </div>
                    <p className='eli-p'>{name}</p>
                </div>
            );
        } else {
            return (
                <div className='eli-submenu flex row align-center justify-sb'>
                    <div
                        className='flex row align-center'
                        onClick={() => subMenuAction("Edit")}
                    >
                        <p>Edit</p>
                        <MdEdit color={"#c7c7c7"} size={"20px"} />
                    </div>
                    <div
                        className='flex row align-center'
                        onClick={() => subMenuAction("Remove")}
                    >
                        <p>Remove</p>
                        <MdRemoveCircle color={"#c7c7c7"} size={"20px"} />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className='eli-container flex row align-center justify-sb'>
            {renderContent()}
            {!subMenu ? (
                <HiOutlineDotsVertical
                    color={"#c7c7c7"}
                    onClick={() => setSubMenu(true)}
                />
            ) : (
                <AiOutlineClose
                    color={"#c7c7c7"}
                    onClick={() => setSubMenu(false)}
                />
            )}
        </div>
    );
};

export default EmployeeListItem;
