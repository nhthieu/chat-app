import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "http://localhost:5000";
  const { search } = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });
  }, [ENDPOINT, search]);


  return (
    <h1>Chat!!</h1>
  )
}