import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SearchIcon from "@material-ui/icons/Search";


import "../css/Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";


import { selectUser } from '../features/userSlice';

import db, { auth } from "../components/firebase";



function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  console.log(`object`, user);

  const { photo } = user;

  useEffect(() => {
    db.collection('chats').onSnapshot((snapshot) => {
      setChats(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  const addChat = () => {
    const chatName = prompt('Please enter a chat name');

    db.collection('chats').add({
      chatName: chatName
    });
  }

  console.log("chats-->", chats)

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar className="sidebar__avatar" src={photo} onClick={() => auth.signOut()}/>

        <div className="sidebar_input">
          <SearchIcon />
          <input type="text" placeholder="Search"></input>
        </div>

        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewIcon onClick={addChat}/>
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName }}) => <SidebarChat key={id} id={id} chatName={chatName} />)}
      </div>
    </div>
  );
}

export default Sidebar;
