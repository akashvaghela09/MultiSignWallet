import React, { useEffect } from "react";
import styles from "../Styles/Error.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BsBugFill } from 'react-icons/bs';
import { setError } from "../Redux/app/actions";

const Error = () => {
    const dispatch = useDispatch();
    const location = useLocation();
  
    const handleError = () => {
        dispatch(setError(false))
        // window.location.reload()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay}/>
            <div className={styles.errorModal}>
                <BsBugFill className={styles.bugIcon}/>
                <div className={styles.contentModal}><p>Something went wrong</p></div>
                <button className={styles.errButton} onClick={handleError}>Ok</button>
            </div>
        </div>
    );
};

export { Error };
