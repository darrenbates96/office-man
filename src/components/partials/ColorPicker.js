import React, { useState, Fragment } from "react";
import { AiOutlineDown } from "react-icons/ai";
import "../../styles/ColorPicker.css";

const ColorPicker = ({ passColor, existingColor }) => {
    // If an existing color is present, set the state accordingly
    let existing_color = null;
    if (existingColor) {
        existing_color = existingColor;
    }

    // State instantiation for color dropdown
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(existing_color);

    // Function to pass color up to parent
    // component <OfficeModalForm /> and
    // to change component state
    const changeColor = (col) => {
        passColor(col);
        setColor(col);
    };

    // Function that renders content
    // based on the isOpen state
    const renderContent = () => {
        if (!isOpen) {
            return (
                <Fragment>
                    <p>
                        Office Color
                        <span style={{ color: color }}>
                            {color ? ` ${color}` : null}
                        </span>
                    </p>
                    <AiOutlineDown
                        color={"#aaaaaa"}
                        style={{ paddingTop: "2px" }}
                    />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div
                        className='color red'
                        onClick={() => changeColor("Red")}
                    ></div>
                    <div
                        className='color black'
                        onClick={() => changeColor("Black")}
                    ></div>
                    <div
                        className='color green'
                        onClick={() => changeColor("Green")}
                    ></div>
                    <div
                        className='color yellow'
                        onClick={() => changeColor("Yellow")}
                    ></div>
                    <div
                        className='color orange'
                        onClick={() => changeColor("Orange")}
                    ></div>
                </Fragment>
            );
        }
    };

    return (
        <div
            className='colorpicker-container flex row align-center'
            onClick={() => setIsOpen(!isOpen)}
        >
            {renderContent()}
        </div>
    );
};

export default ColorPicker;
