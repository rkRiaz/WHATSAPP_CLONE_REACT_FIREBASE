import React, {useState, useEffect} from 'react'
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { Link } from 'react-router-dom';


function SidebarChat({id, name, addNewChat}) {

    const[seeds, setSeeds] = useState("")

    const createChat = e => {
        const roomName = prompt("Please enter name for chat room")
        if(roomName) {
            db.collection("rooms").add({
                name: roomName,

            })
        }
    }

    useEffect(() => {
        setSeeds(Math.floor(Math.random() * 5000))
    }, [])

    return !addNewChat ? (
       <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seeds}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p> Last message... </p>
                </div>
            </div>
       </Link>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
