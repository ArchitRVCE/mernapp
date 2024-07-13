import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [searchKey,setSearchKey] = useState('');

    const loadData = async () => {
        await fetch("/api/fetchData",
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
        })
            .catch(error => console.log(error.message))

    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ "objectFit": 'contain !important' }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ "zIndex": "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="/pancake.jpg" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="/pizza.webp" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    (foodCat && foodCat != [])
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        (foodItem && foodItem != [])
                                            ?
                                            foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchKey.toLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card //foodName={filterItems.name}
                                                                //foodDesc={filterItems.description}
                                                                foodItem={filterItems}
                                                                options={filterItems.options}>
                                                                </Card>
                                                        </div>
                                                    )
                                                }) :
                                            <div>Coming Soon!</div>}
                                </div>
                            )
                        })
                        : ""
                }
            </div>
            <div><Footer /></div>
        </>
    )
}