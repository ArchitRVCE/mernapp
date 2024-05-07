import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        await fetch("http://localhost:5000/api/fetchData",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'applicaton/json'
                }
            }
        ).then(async response => {
            response = await response.json();
            setFoodItem(response[0]) 
            setFoodCat(response[1])
            //console.log(response[0], response[1]);
        })
        .catch(error=>console.log(error.message))

    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <div><Navbar /></div>
            <div><Carousel /></div>
            <div className='m-5'>
                <Card />
                <Card />
            </div>
            <div><Footer /></div>
        </>
    )
}
