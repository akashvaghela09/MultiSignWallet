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

    const getData = async () => {
        checkWallet()

        let tempArr = []
        let data = await contract.getAllData();

        for (let i = 0; i < data.length; i++) {
            let tempObj = {}
            tempObj["id"] = +data[i].id.toString();
            tempObj["title"] = data[i].title;
            tempObj["amount"] = +data[i].amount.toString();
            tempObj["workDone"] = data[i].workDone;
            tempObj["approved"] = data[i].approved;
            tempObj["receiver"] = data[i].receiver;
            tempObj["sender"] = data[i].sender;

            tempArr.push(tempObj);
        }

        console.log(tempArr);
        setList([...tempArr])
    }

    const checkWallet = () => {
        if (isAuth === false) {
            let alertObj = { status: true, msg: "Please Connect Your Wallet to Fetch Data" }
            dispatch(setAlert(alertObj))
        }
    }

    const handleMarkComplete = async (para) => {
        await contract.markComplete(para);

        getData();
    }

    const handleApprove = async (para) => {
        await contract.approve(para, { value: list[para].amount });

        getData()
    }

    useEffect(() => {
        getData()
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.cardDiv}>
                {
                    list.length !== undefined &&
                    list.length >= 0 &&
                    list.map((el) => {
                        return (
                            <div className={styles.card}>
                                <p className={styles.cardTitle}>{el.title}</p>
                                <p className={styles.cardAmount}>Amount : {el.amount}</p>
                                <label className={styles.statuslabel}>
                                    <p className={styles.statustext1}>Work Done : </p>
                                    <p className={styles.statustext2}>{el.workDone === true ? "Yes" : "No"}</p>
                                </label>
                                <div className={styles.buttonDiv}>
                                    {
                                        el.workDone == false ?
                                            <button className={styles.completeBtn} onClick={() => handleMarkComplete(el.id)}>Mark Complete</button> :
                                            <button disabled className={styles.completeBtn} onClick={() => handleMarkComplete(el.id)}>Mark Complete</button>
                                    }
                                    {
                                        el.approved == false ?
                                            <button className={styles.approveBtn} onClick={() => handleApprove(el.id)}>Approve Fund</button> :
                                            <button disabled className={styles.approveBtn} onClick={() => handleApprove(el.id)}>Approve Fund</button>
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