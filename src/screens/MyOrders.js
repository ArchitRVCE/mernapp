import React, { useEffect, useState } from 'react'

export default function MyOrders() {
    //const [myOrders,setMyOrders] = useState({});
    //let emailid = localStorage.getItem("useremail");
    const fetchMyOrders = async() =>{
        await fetch("http://localhost:5000/api/getMyOrders",
            {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    emailId: localStorage.getItem("useremail")
                })
            }
        ).then(async res=>{
            console.log('MyOrders data',await res.json())
        }).catch(err=>console.log(err.message))
    }
    useEffect(()=>{
        fetchMyOrders();
    },[])
  return (
    <div>MyOrders</div>
  )
}
