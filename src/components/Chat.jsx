import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import createSockerConfiguration from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  if (!targetUserId) return;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);

  const userId = user?._id;
  const firstName = user?.firstName;

  useEffect(() => {
    const socket = createSockerConfiguration();
    socket.emit("joinChat", { userId, targetUserId });
    socket.on("messageReceived", ({ firstName, newMessage }) => {
      console.log(firstName, " sends ", newMessage);
      setMessages((messages) => [...messages, { firstName, newMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = (e) => {
    e.preventDefault();
    const socket = createSockerConfiguration();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      newMessage,
    });
    setNewMessage("");
  };
  return (
    <div>
      <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <div className="flex justify-between align-middle border-b border-gray-600">
          <h1 className="p-5 ">Chat</h1>
          <Link to="/connections">
            <h1 className="p-5">Go back</h1>
          </Link>
        </div>
        <div className=" overflow-scroll">


        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.newMessage}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
        </div>
      </div>
      <div className="">
        <div className="w-3/4 mx-auto p-5 border border-gray-600 items-center gap-2">
        <form className='flex' onSubmit={(e)=>sendMessage(e)}>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message"
            className="flex-1 border border-gray-500 text-white rounded p-2 mr-5"
          ></input>
          <button type="submit"  className="btn btn-secondary">
            Send
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
