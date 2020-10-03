import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser,setLoggedInUser]= useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
      const savedCart = getDatabaseCart();
      const orderDetails = {...loggedInUser,products:savedCart,shipment:data,orderTime:new Date()}
      fetch('http://localhost:5000/addOrder',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      })
      .then(res=>res.json())
      .then(data =>{
        if(data){
          processOrder();
          alert('Order placed successfully')
        }
      })
    }
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.name && <span className="error" >Name is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
        {errors.email && <span className="error" >Email is required</span>}

        <input name="address" ref={register({ required: true })} />
        {errors.address && <span className="error" >Address is required</span>}

        <input name="phone" ref={register({ required: true })} />
        {errors.phone && <span className="error" >Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;