import React, { useState } from "react";
import "./Auth.css";
import logo from "../../img/logo.png";
import {useDispatch , useSelector} from 'react-redux';
import { logIn, signUp } from "../../actions/AuthAction";
import authReducer from "../../reducers/authReducer";
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword , setConfirmPassword] = useState(true)
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    username: "",
  });

 // change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

// submit
const handleSubmit = (e) => {
  // ngăn chặn hành vi mặc định của trình duyệt
 e.preventDefault();
 if(isSignUp){
     data.password === data.confirmpassword
     ? dispatch(signUp(data))
     : setConfirmPassword(false)
 }
 else{
   dispatch(logIn(data))
 }
}
// reset form 
const resetForm = () =>{
   setConfirmPassword(true);
   setData({
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    username: "",
   })
}

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughtout the world</h6>
        </div>
      </div>
      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange={handleChange}
                value={data.confirmpassword}
              />
            )}
          </div>
          <span style={{display: confirmPassword ? "none" :"block", color:'red',fontSize:'12px',alignSelf:'flex-end',marginRight:'5px'}}>* Confirm Password is not same</span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {setIsSignUp((prev) => !prev);resetForm()}}
            >
              {isSignUp
                ? "Already have an accouunt. Login!"
                : "Don't have an accouunt. Signup!"}
            </span>
            <button className="button infoButton" type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "loading..." : isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// function Login(){
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">

//            <h3>Log In</h3>
//           <div >
//                <input type="text" className="infoInput" name='username' placeholder='Username'/>
//           </div>
//           <div>
//              <input type="text" className="infoInput" placeholder='Password' name='password' />
//           </div>
//           <div>
//             <span style={{fontSize:'12px'}}>Don't have an accouunt. Signup!</span>
//             <button className="button infoButton" type='submit'>Login</button>
//           </div>
//       </form>
//     </div>
//   )
// }
//  function SignUp(){
//    return (
//      <div className="a-right">
//        <form className="infoForm authForm">

//             <h3>Sign up</h3>
//            <div>
//               <input type="text" placeholder='First Name' className='infoInput' name='firstname' />
//               <input type="text" placeholder='Last Name' className='infoInput' name='lastname' />
//            </div>
//            <div >
//                 <input type="text" className="infoInput" name='username' placeholder='Username'/>
//            </div>
//            <div>
//               <input type="text" className="infoInput" placeholder='Password' name='password' />
//               <input type="text" className="infoInput" placeholder='Confirm Password' name='confirmpassword' />

//            </div>
//            <div>
//              <span style={{fontSize:'12px'}}>Already have an accouunt. Login!</span>
//              <button className="button infoButton" type='submit'>Signup</button>
//            </div>
//        </form>
//      </div>
//    )
//  }
export default Auth;
