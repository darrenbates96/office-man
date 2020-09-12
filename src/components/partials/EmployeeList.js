import React, { useState, Fragment } from "react";
import { MdSearch } from "react-icons/md";
import ScaleLoader from "react-spinners/ScaleLoader";
import EmployeeListItem from "./EmployeeListItem";
import "../../styles/EmployeeList.css";

const EmployeeList = ({
    currentOffice,
    employees,
    toggleModal,
    setAction,
    dispatch,
}) => {
    // Instantiate state for search bar
    const [search, setSearch] = useState("");

    // Destructure out needed props
    const { no_occupants, id } = currentOffice;

    // Renders out the list of employees
    const renderList = () => {
        if (employees.length !== 0) {
            return (
                <Fragment>
                    {employees.map((employee) => {
                        if (employee.office_id === id) {
                            return (
                                <EmployeeListItem
                                    key={employee.id}
                                    name={employee.name}
                                    toggleModal={toggleModal}
                                    setAction={setAction}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                </Fragment>
            );
        } else {
            return (
                <div className='loader flex align-center justiify-center'>
                    <ScaleLoader />
                </div>
            );
        }
    };

    return (
        <Fragment>
            <div className='search-bar flex column align-center'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search...'
                />
                <MdSearch
                    color={"#c7c7c7"}
                    size={"20px"}
                    className='search-icon'
                />
            </div>
            <div className='addstaff flex row align-center justify-sb'>
                <p>Staff Members 0/{no_occupants}</p>
                <button
                    onClick={() => {
                        setAction("Add");
                        toggleModal();
                    }}
                >
                    Add Staff
                </button>
            </div>
            <div className='employeelist-container flex column fill-remaining align-center'>
                {renderList()}
            </div>
        </Fragment>
    );
};

export default EmployeeList;
