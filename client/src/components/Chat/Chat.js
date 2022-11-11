import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "./Chat.css";


import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer"

let socket;

export default function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const ENDPOINT = "http://localhost:5000";
  const { search } = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        toast(error);
        setError(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [ENDPOINT, search]);

  // Listen for messages
  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    })
  }, [messages])

  // Send messages function
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages
          messages={messages}
          name={name}
        />
        {!error &&
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        }
      </div>
      <TextContainer users={users} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}