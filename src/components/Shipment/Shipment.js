import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import './Shipment.css'
import { UserContext } from './../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const onSubmit = data => {
    const savedCart=getDatabaseCart();
    const orderDetails={...loggedInUser, products: savedCart, shipment:data, orderTime:new Date ()};
    fetch('https://arcane-sierra-36117.herokuapp.com/addOrder',{
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data){
        processOrder();
        alert('Your Ordered added successfully')
      }
    })
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
      {errors.name && <span className='error'>Name is required*</span>}

      <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email"/>
      {errors.email && <span className='error'>Email is required*</span>}

      <input {...register("address", { required: true })} placeholder="Your Address"/>
      {errors.address && <span className='error'>Address is required*</span>}

      <input {...register("phone", { required: true })} Placeholder="Your Phone Number"/>
      {errors.phone && <span className='error'>Phone number is required*</span>}

      <input type="submit"/>
    </form>
  );
};

export default Shipment;