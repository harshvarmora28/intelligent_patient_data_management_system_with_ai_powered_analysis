import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import Messages from "./Messages";
import Input from "./Input";
import { useGlobalState } from "@/context/useGlobalState";

const ENDPOINT = "https://chat-server-xnmd.onrender.com";
let socket: any;

const Chat = ({ room }: any) => {
  const [message, setMessage] = useState<any>("");
  const [messages, setMessages] = useState<any>([]);
  const { state } = useGlobalState();
  const { patientProfile } = state;

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    if (patientProfile.name && room) {
      socket.emit("join", { name: patientProfile.name, room }, (error: any) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }, [patientProfile, room]);

  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="main_cont h-full">
      <div className="bg-green-500 py-2 px-4 text-white font-semibold text-lg">
        {room}
      </div>
      <div style={{height: '700px'}} className="py-4">
          <Messages messages={messages} name={patientProfile.name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
    </div>
  );
};

export default Chat;
