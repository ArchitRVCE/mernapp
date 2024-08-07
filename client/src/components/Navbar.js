import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/Login')
    }
    return (<div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success custom_style" style={{}}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">Royal Delicacy</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
                        </li>
                        {localStorage.getItem("authToken") ?
                            <li className="nav-item">
                                <Link className="nav-link fs-4" aria-current="page" to="/MyOrders">My Orders</Link>
                            </li>
                            : ""
                        }
                    </ul>
                    {!localStorage.getItem("authToken") ?
                        <div className="d-flex">
                            <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/Signup">Sign Up</Link>
                        </div>
                        :
                        <>
                            <div className="btn bg-white text-success mx-1" onClick={() => { setCartView(true) }}>
                                My Cart {"   "}
                                {
                                    data.length ?
                                        <Badge pill bg="danger">{data.length}</Badge>
                                        : ""
                                }
                            </div>
                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                            <div className="btn btn-danger text-white mx-1" onClick={handleLogout}>Logout</div>
                        </>
                    }

                </div>
            </div>
        </nav>
    </div>
    )
}
