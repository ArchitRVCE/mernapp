import React, { useEffect, useRef, useState } from 'react'
import {useCart,useDispatchCart} from '../components/ContextReducer'
export default function Card(props) {
    let options = props.options[0];
    let priceOptions = Object.keys(options)
    const [qty,setQty] = useState(1);
    const [size,setSize]= useState('');
    //let foodItem = props.foodItem;
    let dispatch = useDispatchCart();
    let data = useCart();
    let priceRef = useRef();

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    const handleAddToCart = async() => {
        await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
        await console.log(data);
    }
    let finalPrice = qty*parseInt(options[size])
    return (
        <div>
            {/* <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>  */}
            <div className="card mt-3" style={{ "width": "18rem", "heiht": "max-content" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ "height": "150px", "objectFit": "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">{props.foodItem.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>{setQty(e.target.value)}}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add To Cart</button>

                </div>
            </div>
        </div>
    )
}
