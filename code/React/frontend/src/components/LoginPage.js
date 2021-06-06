
import './css/LoginPage.css';
import { Link } from 'react-router-dom';
import React from 'react';


class LoginPage extends React.Component {

    render(){
        return (
      
        <div class="container">
            <div class="welcome-div">
                <h1>Welcome, back!</h1>
            </div>

            <div class="form-div">
                <form onsubmit="">
                    <div class="logintitle">
                        <h1>Login</h1>
                        <hr id="loginhr"/>
                    </div>

                    <div class="labels-inputs">
                        <div class="input-box">
                            
                            <label>Email</label>
                            <input class="box" type="email" placeholder=" ✉️Enter Email Id"/>
                            
                        </div>

                        <div class="input-box">
                            <label>Password</label>
                            <input class="box" type="password" placeholder=" 🔒Enter Password"/>
                        </div>
                    </div>

                    <div><p>Forgot Password?</p></div>

                    <div class="signin-button">
                        <button >Sign In</button>
                    </div>

                    <hr id="sign-in-up"/>

                    <div class="signup-button">
                        <Link to="/signup">
                            <button id="createbutton">Create an Account</button>
                        </Link>
                        
                    </div>

                </form>
            </div>
        </div>
      
    
  );
    }
}

export default LoginPage;
