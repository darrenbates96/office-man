import React from "react";
import "../../styles/TopHeader.css";

const TopHeader = ({ toggleModal, setAction }) => {
    // Function to set the action type and then toggle
    // the modal to make it appear
    const buttonHelper = () => {
        setAction("Add");
        toggleModal();
    };

    return (
        <div className='topheader-container'>
            <h1>Office Man</h1>
            <button onClick={buttonHelper}>Add Office</button>
        </div>
    );
};

export default TopHeader;
