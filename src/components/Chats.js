import React, { useRef, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { ChatEngine} from 'react-chat-engine'
import { auth } from "../firebase";

import { useAuth } from "../Contexts/AuthContext";
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); //Blob transfiere un archivo en un metodo binario.

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'});
    }

    useEffect(() => {
        if (!user) {
            history.push('/')
            return;
        }
        
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": 'a614d853-3ba9-42de-89e1-f3e005b2b16d',
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users', 
                    formdata, 
                    {headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history])

    if(!user || loading) return "Loading..."


    console.log(user)

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Nico Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID = { process.env.REACT_APP_CHAT_ENGINE_ID } 
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats
