import React, { useEffect, useState } from "react";
import styles from "../Styles/CreateContract.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setAlert } from "../Redux/app/actions";

const CreateContract = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [amount, setAmount] = useState("");
    const [receiver, setReceiver] = useState("");

    let navigate = useNavigate();

    const { isAuth, contract } = useSelector(state => state.app);

    const handleSubmit = async () => {
        checkWallet();

        await contract.addTransaction(+amount, receiver)
        await contract.getTotal()
    .then((res) => {
        console.log(res.toString());
            setAmount("")
            setReceiver("")

            let alertObj = { status: true, msg: `Your Transaction ID is ${res.toString()}` }
            dispatch(setAlert(alertObj))

        }).then(() => {
            navigate("/contract-list")
        })
    }

    const checkWallet = () => {
        if(isAuth === false){
            let alertObj = {status: true, msg: "Please Connect Your Wallet to Perform This Action"}
            dispatch(setAlert(alertObj))
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.formDiv}>
                <p className={styles.formTitle}>Create New Transaction</p>
                <div className={styles.formSection}>
                    <label className={styles.formLabel}>Amount</label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="amount" className={styles.formInput} />
                </div>
                <div className={styles.formSection}>
                    <label className={styles.formLabel}>Address</label>
                    <input value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="receiver's address" className={styles.formInput} />
                </div>
                <div className={styles.submitDiv}>
                    <button className={styles.submitButton} onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export { CreateContract };
