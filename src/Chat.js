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
// import axios from 'axios'
// import Moment from 'react-moment';



function Chat() {

    const[input, setInput] = useState("")
    const[roomName, setRoomName] = useState("")
    const[messages, setMessages] = useState([])
    const { roomId } = useParams()

    useEffect(() => {
        db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
            setRoomName(snapshot.data().name)
            // setMessages(snapshot.data().messages)
        ))
        
    }, [roomId])

    const sendMessage = async(e) => {
        e.preventDefault()

        setInput("")
    }
 
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen at ...</p>
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
                    <p  key={message.id} className={`chat__message ${true && "chat__reciever"}`}>
                        <span className="chat__name">
                            rkRiaz
                        </span>
                        hey guys
                        <span className="chat__timeStamp">
                            {/* <Moment format="h:mm A, D MMMM" date={m.createdAt}/> */}
                            just now
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
