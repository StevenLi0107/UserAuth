import React, { useState, useEffect } from 'react';
import { message, } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { LoggedinAction } from "../State/authAction";
import { useNavigate } from "react-router-dom";
import LoginReducer from "../State/loginReducer";
import api from '../Helper/API';


export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userErr, setUserErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [loginData, setLoginData] = useState([])

    const dispatch = useDispatch();
    const navigate = useNavigate()

    // useEffect( async() => {
    //   const res = await api.post("/loginAdmin",{admin_id:});
    //   console.log("logindata", res)
    // }, [])
    
    const handleLogin =async(e)=>{
       if(username==="" && password===""){ setUserErr("Enter Username......");setPassErr("Enter Password......")}
       if(username===""){setUserErr("Enter Username.......")}
       if(password===""){setPassErr("Enter Password.......")}

       const res = await api.post("/loginAdmin",{admin_id:username, password:password})
      //  console.log("res",res)
      if(res.data.status===1){
        message.success("Login Successful")
        dispatch(LoggedinAction())
         navigate("/home");
         setUsername("");setPassword("");
      }
      else{
        message.error("inValid Username and Password")
      }
    

        
   
e.preventDefault();
  };
    
  return (
    <div>
  <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}}
              />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#FF6219"}}></i>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>
                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Login into your account</h5>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">User Name</label>
                    <input type="text" id="email" className="form-control form-control-lg"value={username} onChange={(e)=>setUsername(e.target.value)} />
                    <label style={{color:"red"}}>{userErr}</label>
                  </div>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control form-control-lg" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <label style={{color:"red"}}>{passErr}</label>
                  </div>
                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" onClick={handleLogin} type="button">Login</button>
                  </div>
                  {/* <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
