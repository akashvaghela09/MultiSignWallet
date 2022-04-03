
import React, { useEffect } from 'react';
import './App.css';
import { AllRoutes } from './Routes/AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "./Component/Spinner";
import { Error } from './Component/Error';
import { Alert } from './Component/Alert';
// import myContractData from "./artifacts/contracts/Test.sol/Test.json";
import { setContractInstance } from "./Redux/app/actions.js";
import { ethers } from "ethers";

function App() {
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isAlert
  } = useSelector(state => state.app)

  // const abi = myContractData.abi;
  // const contract_address = process.env.REACT_APP_CONTRACT_ADDRESS;

  const handleContract = () => {
    // const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // let mySigner = ethersProvider.getSigner();

    // let contractObj = new ethers.Contract(
    //   contract_address,
    //   abi,
    //   mySigner
    // );

    // dispatch(setContractInstance(contractObj))
  }

  useEffect(() => {
    handleContract()
  }, []);
  return (
    <div className="App">

      <AllRoutes />

      {
        isLoading === true && <Spinner />
      }
      {
        isError === true && <Error />
      }
      {
        isAlert.status === true && <Alert />
      }
    </div>
  );
}

export default App;
