import { Button } from '@material-ui/core'
import React from 'react'
import "../css/Login.css"

import { auth, provider } from "../components/firebase";

function Login() {

    const signin = () => {
        auth.signInWithPopup(provider)
        .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            {/* <h2>Login Page</h2> */}
            <div className="login__logo">
                <img src="https://cdn.osxdaily.com/wp-content/uploads/2014/11/mac-messages-icon-300x276.jpg" />
                <h1>Message</h1>
            </div>

            <Button onClick={signin}>Sign In</Button>
            
        </div>
    )
}

export default Login
