import React from 'react'
import { Link } from 'react-router-dom'

const GoHome = () => {
    return (
        <>
            <Link to='/'><button className='btn btn-warning m-3'>Go Home</button></Link>
        </>
    )
}

export default GoHome
