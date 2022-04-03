import React, { useEffect } from "react";
import styles from "../Styles/Alert.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoAlertCircleOutline } from 'react-icons/io5';
import { setAlert } from "../Redux/app/actions";

const Alert = () => {
    const dispatch = useDispatch();
    const location = useLocation();
  
    const { isAlert } = useSelector((state) => state.app)
    const handleAlert = () => {
        let alertObj = {status: false, msg: ""};
        dispatch(setAlert(alertObj))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay}/>
            <div className={styles.alertModal}>
                <IoAlertCircleOutline className={styles.alertIcon}/>
                <div className={styles.contentModal}><p>{isAlert.msg}</p></div>
                <button className={styles.alertButton} onClick={handleAlert}>Ok</button>
            </div>
        </div>
    );
};

export { Alert };
