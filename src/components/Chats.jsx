import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth?.signOut();
        history?.push('/');
    };

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    };

    useEffect(() => {
        if (!user) {
            history?.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "bd1d5a03-5b1b-47e8-a5ca-1e2b809ee8bb",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata?.append('email', user.email);
            formdata?.append('username', user.email);
            formdata?.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata?.append('avatar', avatar, avatar.name);
                axios?.post('https://api.chatengine.io/users/',
                    formdata,
                    { headers: { "private-key": "e6f56002-99cd-4c8a-8e14-df323bf23768" } }
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error));
            });
        });
    }, [user, history]);

    if (!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                <img className="logo-img" style={{width: "50px"}} src="https://cdn-icons-png.flaticon.com/128/9862/9862030.png" alt="" />
                    OnionChat
                </div>
                <div style={{width: "50px", height: "50px",}}  onClick={handleLogout} className="logout-tab"></div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="bd1d5a03-5b1b-47e8-a5ca-1e2b809ee8bb"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;
