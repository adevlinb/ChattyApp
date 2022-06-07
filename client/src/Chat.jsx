import React, { useEffect, useState } from "react";


export default function Chat ({ socket, userInput }) {
    const [message, setMessage] = useState ("");

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: userInput.room,
                name: userInput.name,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setMessage("");
        }
    }

    useEffect(() => {
        console.log("im here");
        socket.on("receive_message", (data) => {
            console.log("receiving message2", data);
        })
    }, [socket]);

    return (
        <div>
            <h1>{userInput.name}</h1>

            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input type="text" placeholder="Hey..." name="message" value={message} onChange={(event) => setMessage(event.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>


        </div>
    );
}