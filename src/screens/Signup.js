import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const header = {'Content-Type': 'application/json'}
        //const response = axios.post("http://localhost:5000/api/createuser", { headers: header }, { body: JSON.stringify(credentials) })
        /*const response = await axios.post({url:"http://localhost:5000/api/createuser",method:"POST",headers:header,data:JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            location: credentials.geolocation,
            password: credentials.password
          })})*/
          const response = await fetch("http://localhost:5000/api/createuser",{
            method: "POST",
            headers:header,
            body: JSON.stringify({name: credentials.name,
                email: credentials.email,
                location: credentials.geolocation,
                password: credentials.password})}
            )
            const json = await response.json();
            console.log(json);
            if(!json.success){
                alert("Enter a valid credential");
            }
            navigate('/login');
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/Login" className='m-3 btn btn-danger'>Already a User?</Link>
                </form>
            </div>
        </>
    )
}
