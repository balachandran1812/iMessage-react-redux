import { MicNoneOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "../css/Chat.css";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";

import Message from "../components/Message";
import { selectChatId, selectChatName } from "../features/chatSlice";
import db from "./firebase";

import firebase from "firebase";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);
  const chatName = useSelector(selectChatName);

  useEffect(() => {
    if (chatId) {
        console.log(`chatId---->`, chatId);
        setMessages([]);
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]);

  console.log(`messages---->`, messages);

  // Send
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(`e`, input, chatId);

    // Firebase Logic create messages
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };

  return (
    <div className="chat">
      {/* header */}
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* messages */}
      <div className="chat__messages">
        {/* <FlipMove> */}
          {messages.length > 0 && messages.map(({ id, data }) => (
            <Message key={id} id={id} contents={data} />
          ))}
        {/* </FlipMove> */}
      </div>

      {/* chat input */}

      <div className="chat__input">
        <form>
          <input
            placeholder="Imessage"
            type="text"
            className=""
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="" onClick={sendMessage}>
            Send Message
          </button>
        </form>

        <IconButton className="">
          <MicNoneOutlined className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
