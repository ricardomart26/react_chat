import React, { useEffect, useState } from 'react';


function Chat({ socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState('');
    

    useEffect(() => {
        socket.on('receive_message', (message) => {
            console.log(message);
        })
    }, [socket])

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setCurrentMessage('');
        }
    }
    return (
        <div>
            <div className='header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>

            </div>
            <div className='chat-footer'>
                <input type='text' placeholder='Write a message...' onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}


export default Chat;