import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

const Login = () => {
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch(error => console.error(error));
    };

    const handleFacebookLogin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider).catch(error => console.error(error));
    };

    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to OnionChat!</h2>
                <div className="login-button google" onClick={handleGoogleLogin}>
                    <GoogleOutlined /> Sign In with Google
                </div>
                <br /><br />
                <div className="login-button facebook" onClick={handleFacebookLogin}>
                    <FacebookOutlined /> Sign In with Facebook
                </div>
            </div>
        </div>
    );
}

export default Login;
