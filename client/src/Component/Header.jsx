import React from 'react';
import styles from '../Styles/Header.module.css'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router';
import { MdOutlineDashboard } from 'react-icons/md';
import { BsQuestionCircle, BsGithub } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { FaClipboardList } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { Wallet } from './Wallet';

const Header = () => {
    const location = useLocation();
    let navigate = useNavigate();
    let path = location.pathname;
    const handleRoute = (para) => {
        navigate(`/${para}`)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.pageLinkContainer}>
                <label className={path === "/" ? styles.activeLink : styles.pageLink} onClick={() => handleRoute("")} >Multi-Sign-Wallet</label>
                <div className={styles.routeContainer}>
                    <label className={path === "/create-contract" ? styles.activeLink : styles.pageLink} onClick={() => handleRoute("create-contract")} >Apply</label>
                    <label className={path === "/contract-list" ? styles.activeLink : styles.pageLink} onClick={() => handleRoute("contract-list")} >List</label>
                    <label className={styles.pageLink} onClick={() => window.open(`https://github.com/akashvaghela09/MultiSignWallet`, '_blank')} >GitHub</label>
                </div>
            </div>
            
            <Wallet />


            <div className={styles.bottomWrapper}>
                <label className={styles.iconWrapper} onClick={() => handleRoute("")} >
                    <AiOutlineHome 
                        className={path === "/" ? styles.activeLinkIcon : styles.pageIcon} 
                    />
                    <p>Home</p>
                </label>
                <label className={styles.iconWrapper} onClick={() => handleRoute("create-contract")} >
                    <GiNotebook 
                        className={path === "/create-contract" ? styles.activeLinkIcon : styles.pageIcon} 
                    />
                    <p>Apply</p>
                </label>
                <label className={styles.iconWrapper} onClick={() => handleRoute("contract-list")} >
                    <FaClipboardList 
                        className={path === "/contract-list" ? styles.activeLinkIcon : styles.pageIcon} 
                    />
                    <p>List</p>
                </label>
                <label className={styles.iconWrapper} onClick={() => window.open(`https://github.com/akashvaghela09/MultiSignWallet`, '_blank')} >
                    <BsGithub className={path === "/github" ? styles.activeLinkIcon : styles.pageIcon} />
                    <p>GitHub</p>
                </label>
            </div>
        </div>
    )
}

export { Header }