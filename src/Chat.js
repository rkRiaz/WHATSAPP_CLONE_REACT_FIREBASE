import React, {useState, useEffect} from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom"
import db from "./firebase"
import { useStateValue } from './StateProvider';
import firebase from "firebase"
// import axios from 'axios'
// import Moment from 'react-moment';



function Chat() {

    const[input, setInput] = useState("")
    const[roomName, setRoomName] = useState("")
    const[messages, setMessages] = useState([])
    const[{user}, dispatch] = useStateValue()
    const { roomId } = useParams()

    useEffect(() => {
        if(roomId) {
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ))
            db.collection("rooms")
                .doc(roomId).collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data())))
        }
        
    }, [roomId])

    const sendMessage = async(e) => {
        e.preventDefault()
        
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("")
    }
 
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen at {" "}
                        {messages[messages.length-1]?.timestamp?.toDate().toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>     
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">

             
              {
                  messages.map(message => (
                    <p key={message.message} className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                            {message.message}
                        <span className="chat__timeStamp">
                            {/* <Moment format="h:mm A, D MMMM" date={m.createdAt}/> */}
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                  ))
              }
                
         
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => {setInput(e.target.value)}} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
     
        </div>
    )
}

export default Chat
