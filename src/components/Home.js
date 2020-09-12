import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { getOfficesAction } from "../redux/actions";
import ScaleLoader from "react-spinners/ScaleLoader";
import TopHeader from "../components/partials/TopHeader";
import OfficeListItem from "./partials/OfficeListItem";
import Modal from "../components/Modal";
import "../styles/Home.css";

const Home = ({ offices, getOffices, actionSuccess, resetActionSuccess }) => {
    // Component level state for modal
    const [modal, setModal] = useState(false);
    const [action, setAction] = useState("Add");

    // ComponenentDidMount
    useEffect(() => {
        if (actionSuccess && modal) {
            setModal(false);
            resetActionSuccess();
        } else {
            getOffices();
        }
    }, [getOffices, actionSuccess, resetActionSuccess, modal]);

    // Function to show either loader or offices
    const renderContent = () => {
        if (offices.length === 0) {
            return (
                <div className='loader flex justify-center align-center'>
                    <ScaleLoader />
                </div>
            );
        } else {
            return (
                <Fragment>
                    {offices.map((office) => {
                        return (
                            <OfficeListItem
                                key={office.id}
                                info={office}
                                toggleModal={() => setModal(!modal)}
                                setAction={(e) => setAction(e)}
                            />
                        );
                    })}
                </Fragment>
            );
        }
    };

    return (
        <div className='home-container'>
            {modal ? (
                <Modal
                    toggleModal={() => setModal(!modal)}
                    type='office'
                    action={action}
                />
            ) : null}
            <TopHeader
                toggleModal={() => setModal(!modal)}
                setAction={(e) => setAction(e)}
            />
            <div className='home-list-container'>{renderContent()}</div>
        </div>
    );
};

// ##### Redux ##### //

// Pull state
const mapStateToProps = (state) => {
    return {
        offices: state.offices,
        actionSuccess: state.actionSuccess,
    };
};

// Create component useable action/s
const mapDispatchToProps = (dispatch) => {
    return {
        getOffices: () => {
            dispatch(getOfficesAction());
        },
        resetActionSuccess: () => {
            dispatch({ type: "RESET_ACTION_SUCCESS" });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
