import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import OfficeModalForm from "./partials/OfficeModalForm";
import EmployeeModalForm from "./partials/EmployeeModalForm";
import "../styles/Modal.css";

const Modal = ({ toggleModal, type, action }) => {
    // Function that decides which modal to show
    // based on the 'type' prop
    const renderContent = () => {
        switch (type) {
            case "office":
                return <OfficeModalForm action={action} />;
            case "employee":
                return <EmployeeModalForm action={action} />;
            default:
                return (
                    <div className='flex align-center justify-center'>
                        <p>Oops... Something went wrong.</p>
                    </div>
                );
        }
    };

    return (
        <div className='modal-container flex column align-center justify-center'>
            <div className='center-modal'>
                <AiOutlineClose
                    color={"#aaaaaa"}
                    size={"30px"}
                    className='close'
                    onClick={toggleModal}
                />
                {renderContent()}
            </div>
        </div>
    );
};

export default Modal;
