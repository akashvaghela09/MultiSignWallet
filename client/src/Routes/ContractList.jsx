import React, { useEffect, useState } from 'react';
import styles from '../Styles/ContractList.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { setAlert } from '../Redux/app/actions';


const ContractList = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { contract, isAuth } = useSelector((state) => state.app);
    const [list, setList] = useState([]);
    const [id, setId] = useState("");

    const getData = async () => {
        // let crrId = +id;
        checkWallet()

        let tempArr = []
        let data = await contract.getTransaction(+id);
        console.log(data);
        let tempObj = {}
        tempObj["id"] = +data[0].toString();
        tempObj["amount"] = +data[1].toString();
        tempObj["approvedBy"] = +data[2].toString();
        tempObj["to"] = data[3];
        tempObj["state"] = data[4];

        tempArr.push(tempObj);

        console.log(tempArr);
        setList([...tempArr])
    }

    const checkWallet = () => {
        if (isAuth === false) {
            let alertObj = { status: true, msg: "Please Connect Your Wallet to Fetch Data" }
            dispatch(setAlert(alertObj))
        }
    }

    const handleApprove = async (para) => {
        await contract.approve(para);

        setTimeout(() => {
            getData();
        }, 5000);
    }

    const handleFund = async (para) => {
        console.log(para);
        await contract.transferAmount(para, { value: list[0].amount });

        setTimeout(() => {
            getData();
        }, 5000);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputDiv}>
                <input className={styles.idInput} value={id} onChange={(e) => setId(e.target.value)} placeholder='tx number' />
                <button className={styles.idSubmit} onClick={() => getData()}>Get</button>
            </div>
            <div className={styles.cardDiv}>
                
                {
                    list.length !== undefined &&
                    list.length >= 0 &&
                    list.map((el) => {
                        return (
                            <div className={styles.card}>
                                <p className={styles.cardAmount}>Amount : {el.amount}</p>
                                <label className={styles.statuslabel}>
                                    Approved By
                                    <p className={styles.statustext2}>{el.approvedBy}</p> 
                                    out of
                                    <p className={styles.statustext2}>3</p> 
                                    owners
                                </label>
                                <div className={styles.buttonDiv}>
                                    {
                                        el.approvedBy >= 2 ?
                                        <button disabled className={styles.completeBtn} onClick={() => handleApprove(el.id)}>Approve</button> :
                                        <button className={styles.completeBtn} onClick={() => handleApprove(el.id)}>Approve</button>
                                    }
                                    {
                                        el.state == 2 ?
                                        <button disabled className={styles.approveBtn} onClick={() => handleFund(el.id)}>Fund</button> :
                                        <button className={styles.approveBtn} onClick={() => handleFund(el.id)}>Fund</button>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export { ContractList }