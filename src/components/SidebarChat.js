import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import timeago from "timestamp-js"

// CSS
import "../css/sidebarChat.css";

// Reducers
import { setChat } from "../features/chatSlice";

// Firebase
import db from "../components/firebase";

function SidebarChat({ id, key, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    if (id) {
        // get Messages based on timestamp
      db.collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setChatInfo(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  const setChatValue = () => {
    dispatch(
        setChat({
          chatId: id,
          chatName: chatName,
        })
      );
  }

  const timestamp = chatInfo && chatInfo[0]?.timestamp && new Date(chatInfo[0]?.timestamp.toDate()).toLocaleString()

  return (
    <div
      className="sidebarChat"
      key={key}
      onClick={setChatValue}
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo.length > 0 && chatInfo[0]?.message}</p>
        <small>
          {timestamp}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
