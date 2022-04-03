import React from 'react';
import styles from "../Styles/Spinner.module.css";
import { ImSpinner9 } from 'react-icons/im';

const Spinner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinnerWrapper}>
                <ImSpinner9 className={styles.spinnerIcon}/>
            {/* <p className={styles.spinnerText}>Loading ...</p> */}
            </div>
        </div>
    )
}

export { Spinner }