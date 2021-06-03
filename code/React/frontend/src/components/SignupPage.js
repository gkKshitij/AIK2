
import React from "react"
import './css/SignupPage.css';
class SignupPage extends React.Component {
    

    render(){
        return(
    <div class="container">
        <div class="greeting-div">
            <h1>Hello!</h1>
        </div>

        <div class="form-div">
            <form>
                <div class="registertitle">
                    <h1>Sign Up</h1>
                    <hr id="registerhr"/>
                </div>

                <div class="labels-inputs">
                    <div class="input-box">
                        
                        <label>Name</label>
                        <input class="box" type="text" placeholder=" 🤖Enter Full Name"/>
                        
                    </div>

                    <div class="input-box">
                        <label>Email</label>
                        <input class="box" type="email" placeholder=" ✉️Enter Email Id"/>
                    </div>

                    <div class="input-box">
                        
                        <label>Mobile</label>
                        <input class="box" type="number" placeholder=" 📱Enter Mobile Number"/>
                        
                    </div>

                    <div class="input-box">
                        <label>Password</label>
                        <input class="box" type="password" placeholder=" 🔒Enter Password"/>
                    </div>
                </div>

                <div class="register-button">
                    <button>Register</button>
                </div>

            </form>
        </div>
    </div>
)
    }
}

export default SignupPage;