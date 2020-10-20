import React, {useState, useEffect} from 'react'
import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import db from "./firebase"

function Sidebar() {
    const[rooms, setRooms] = useState([])

    useEffect(() => {
        const unsubscrive = db.collection("rooms").onSnapshot(snapshot => {
            setRooms(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })) 
            )
        })

        return () => {
            unsubscrive()
        }
        
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://avatars.dicebear.com/api/human/123.svg"/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>     
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Seach to start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {
                    rooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    ))
                }
                {/* {console.log(rooms)} */}
         
            </div>
        </div>
    )
}

export default Sidebar
