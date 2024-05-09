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
                "project-id": "9839c725-674a-41a5-a09b-fb690b9bdba6",
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
                    { headers: { "private-key": "dd57947c-4b6c-4b9a-be55-1839905a51b4" } }
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
                <img className="logo-img" style={{width: "45px"}} src="https://cdn-icons-png.flaticon.com/128/9862/9862030.png" alt="" />
                    OnionChat
                </div>
                <div style={{width: "50px", height: "50px",}}  onClick={handleLogout} className="logout-tab"></div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="9839c725-674a-41a5-a09b-fb690b9bdba6"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;
