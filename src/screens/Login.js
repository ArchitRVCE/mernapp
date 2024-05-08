import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({email: "", password: ""})
  const HandleSubmit = async (e) => {
      e.preventDefault();
      const header = {'Content-Type': 'application/json'}
        const response = await fetch("http://localhost:5000/api/loginuser",{
          method: "POST",
          headers:header,
          body: JSON.stringify({
              email: credentials.email,
              password: credentials.password})}
          )
          const json = await response.json();
          //console.log('json from backed',json);
          if(!json.success){
              alert("Enter a valid credential");
          }
          if(json.success){
            localStorage.setItem("authToken",json.authToken);
            //console.log("AuthToken",localStorage.getItem("authToken"))
            navigate("/");
        }
  }
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container'>
                <form onSubmit={HandleSubmit}>
                
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/Signup" className='m-3 btn btn-danger'>I'm a New User</Link>
                </form>
            </div>
    </>
  )
}
