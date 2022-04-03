import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { CreateContract } from './CreateContract';
import { ContractList } from './ContractList';
import { Header } from "../Component/Header";

const AllRoutes = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/create-contract" element={<CreateContract />} />
                <Route exact path="/contract-list" element={<ContractList />} />
                <Route path="*" element={<h1>Page Not found</h1>} />
            </Routes>
        </div>
    )
}

export { AllRoutes }