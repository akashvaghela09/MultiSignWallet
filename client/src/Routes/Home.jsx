import React, { useEffect, useState } from "react";
import styles from "../Styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "../Redux/app/actions"
import { FaClipboardList } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    let navigate = useNavigate();
    // let path = location.pathname;
    const handleRoute = (para) => {
        navigate(`/${para}`)
    }
    const {
        contract
    } = useSelector((state) => state.app);


    return (
        <div className={styles.wrapper}>
            <p className={styles.pageText}>Multi Signer Wallet Dapp</p>
            <p className={styles.pageText2}>Here you can apply for funds and amount will be transfered based on owner approvals</p>
            <div className={styles.cardDiv}>
                <div className={styles.card} onClick={() => handleRoute("create-contract")}>
                    <GiNotebook className={styles.cardIcon}/>
                    <p className={styles.cardText}>Apply</p>
                </div>
                <div className={styles.card} onClick={() => handleRoute("contract-list")}>
                    <FaClipboardList className={styles.cardIcon}/>
                    <p className={styles.cardText}>List</p>
                </div>
            </div>
            <div className={styles.dummy} />
        </div>
    );
};

export { Home };
