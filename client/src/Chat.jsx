import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"; 

export default function Chat ({ socket, userInput }) {
    const [message, setMessage] = useState ("");
    const [messageList, setMessageList] = useState ([]);

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: userInput.room,
                name: userInput.name,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setMessageList(list => [...list, messageData])
            setMessage("");
        }
    }

    useEffect(() => {
        console.log("im here");
        socket.on("receive_message", (data) => {
            setMessageList(list => [...list, data])
        })
    }, [socket]);

    return (
        <div className="chat-window">

            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((msg) => {
                return (
                <div className="message" id={userInput.name === msg.name ? "you" : "other"}>
                    <div>
                        <div className="message-content">
                            <p>{msg.message}</p>
                        </div>
                        <div className="message-meta">
                            <p>{msg.time}</p>
                            <p>{msg.name}</p>
                        </div>
                    </div>
                </div>
            
                )})}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    placeholder="Hey..." 
                    name="message" 
                    value={message} 
                    onChange={(event) => setMessage(event.target.value)} 
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage();}}
                    />
                <button onClick={sendMessage}>&#9658;</button>
            </div>


        </div>
    );
}