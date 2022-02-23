import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/ManageInventory/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext=createContext();

function App() {
  const [loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Routes>
          <Route exact path="/" element={<Shop/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/review" element={<Review/>}></Route>
          <Route element={<PrivateRoute/>}>
            <Route path='/manage' element={<Manage/>}/>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route element={<PrivateRoute/>}>
            <Route path='/shipment' element={<Shipment/>}/>
          </Route>
          <Route path="/product/:productKey" element={<ProductDetail/>}></Route>
          <Route path="/*" element={<NotFound/>}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
