import React, { useState, useEffect } from "react";
import styles from "../Styles/Wallet.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Onboard from "bnc-onboard";
import WEB3 from "web3";
import { BsWallet2 } from 'react-icons/bs';
import { BiCopy } from 'react-icons/bi';
import { IoWalletOutline } from 'react-icons/io5';
import { GoLinkExternal } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillCaretUp } from 'react-icons/ai';
import { setIsAuth, setWallet, setWalletModal } from "../Redux/app/actions"

const Wallet_old = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    let web3;

    const {
        isAuth,
        wallet,
        walletModal
    } = useSelector(state => state.app)

    const onboard = Onboard({
        dappId: process.env.REACT_APP_ONBOARD_KEY,
        networkId: 4,
        darkMode: true,
        subscriptions: {
            wallet: wallet => {
                web3 = new WEB3(wallet.provider);
            }
        },
        walletSelect: {
            wallets: [
                {
                    walletName: "metamask",
                    preferred: true
                },
                {
                    walletName: "fortmatic",
                    apiKey: process.env.REACT_APP_FORTMATIC_API_KEY,
                    preferred: true
                },
                {
                    walletName: "coinbase",
                    preferred: true
                },
                {
                    walletName: "trust"
                },
                {
                    walletName: "walletConnect",
                    infuraKey: process.env.REACT_APP_INFURA_ID
                },
                {
                    walletName: "portis",
                    apiKey: process.env.REACT_APP_PORTIS_API_KEY
                },
                {
                    walletName: "authereum"
                },
                {
                    walletName: "ledger"
                }
            ]
        }
    })

    const connectWallet = async () => {
        await dispatch(setWalletModal(false))
        await onboard.walletSelect()
        await onboard.walletCheck()

        let auth = await check()
        let currentState = getWalletData()
   
        dispatch(setWallet(currentState))
        dispatch(setIsAuth(auth))
    }

    const check = async () => {
        try {
            const readyToTransact = await onboard.walletCheck()
            if (readyToTransact === true) {
                return true
            }
        } catch {
            return false
        }
    }

    const disconnectWallet = async () => {
        dispatch(setWalletModal(false))
        await onboard.walletReset()
        let auth = await check()
        dispatch(setIsAuth(auth))
    }

    const getWalletData = () => {
        const currentState = onboard.getState()
        return currentState
    }

    const handleWalletConnect = async () => {
        dispatch(setWalletModal(!walletModal))
    }

    const networkObj = {
        1: "MainNet",
        42: "Kovan",
        3: "Ropsten",
        4: "Rinkeby"
    }

    const addressString = () => {
        let adr = wallet.address.split("")
        let start = adr.slice(0, 3).join("")
        let end = adr.slice(-4).join("")
        let string = `${start}...${end}`
        return string;
    }

    return (
        <div className={styles.wrapper} >
            <label
                className={styles.walletWrapper}
                onClick={
                    () => handleWalletConnect()
                }
            >
                <BsWallet2 className={styles.walletIcon} />
                <div className={isAuth === true ? styles.walletBadgeGreen : styles.walletBadge} />
            </label>
            {
                isAuth === true ?
                    <label className={styles.walletStatus} onClick={() => handleWalletConnect()}>
                        <p className={styles.walletText1}>Connected</p>
                        <p className={styles.walletText2}>Disconnect Your Wallet</p>
                    </label>
                    :
                    <label className={styles.walletStatus} onClick={() => handleWalletConnect()}>
                        <p className={styles.walletText1}>Not Connected</p>
                        <p className={styles.walletText2} style={{ color: "#ff6b6b" }}>Connect Your Wallet</p>
                    </label>
            }
            <AiFillCaretUp
                style={{ visibility: walletModal === false && "hidden" }}
                className={styles.caretIcon}
            onClick={() => dispatch(setWalletModal(false))} 
            />
            {
                walletModal === true && isAuth === true ?
                    <div className={styles.walletModal}>
                        <FaUserCircle className={styles.walletUser} />
                        <div className={styles.walletAddressDiv}>
                            <p className={styles.walletModalText}>ETH: {addressString()}</p>
                            <BiCopy className={styles.walletModalIcon} onClick={() =>  navigator.clipboard.writeText(wallet.address)}/>
                            <GoLinkExternal className={styles.walletModalIcon} onClick={() => window.open(`https://rinkeby.etherscan.io/address/${wallet.address}`, '_blank')}/>
                        </div>
                        <div className={styles.walletDataDiv}>
                            <p className={styles.walletModalText}>Wallet</p>
                            <label className={styles.walletName}>
                                <IoWalletOutline className={styles.walletModalIcon} style={{ cursor: "auto", margin: 0 }} />
                                <p className={styles.walletModalText}>{wallet.wallet.name}</p>
                            </label>
                        </div>
                        <div className={styles.walletDataDiv}>
                            <p className={styles.walletModalText}>Network</p>
                            <p className={styles.walletModalText}>{networkObj[wallet.network]}</p>
                        </div>
                        <div className={styles.walletButtonDiv}>
                            <label className={styles.walletSwitchButton} onClick={() => connectWallet()}>Change</label>
                            <label className={styles.walletDisconnectButton} onClick={() => disconnectWallet()}>Disconnect</label>
                        </div>
                    </div> : null
            }
            {
                walletModal === true && isAuth === false ?
                    <div className={styles.walletModal}>
                        <label className={styles.walletConnectButton} onClick={() => connectWallet()}>Connect</label>
                    </div> : null
            }
        </div>
    );
};

export { Wallet_old };
