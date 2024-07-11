import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';
import Loader from '../Loader';

const ChatRoom = () => {
  const [roomId, setRoomId] = useState();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [counter,setCounter]=useState(0)
  const [loading, setLoading] = useState(true); 
  const [websocketStatus, setWebsocketStatus] = useState('disconnected');
  const ws = useRef(null);

  const course = useSelector((store) => store.course.course);
 
  const user=useSelector((store) => (store.authUser.user))

  useEffect(() => {
    if (course) {
      instance
        .get('roomid/', { params: { id: course } })
        .then((response) => {
          setRoomId(response.data.id);
        })
        .catch((error) => {
          console.error('Error fetching roomId:', error);
        });
    }
  }, [course]);

  useEffect(() => {
    if (roomId) {
      connectWebSocket();
    }
  }, [roomId]);

  useEffect(()=>{
    instance
    .get('messages/', { params: { id: roomId } })
    .then((response) => {
      console.log(user)
      setMessages(response.data.slice(-7)); 
      setLoading(false)
      console.log(response.data)
    })
    .catch((error) => {
      console.error('Error fetching roomId:', error);
    });

  },[roomId,counter,user])

  const connectWebSocket = () => {
    ws.current = new WebSocket(`wss://elarning-backend-1-wkvk.onrender.com/ws/chat/${roomId}/`);
    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      setWebsocketStatus('connected');
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { message } = data;
      const username = user.full_name; 
      setCounter(prevCounter => prevCounter + 1);
    };
    
    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      setWebsocketStatus('disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWebsocketStatus('error');
    };
  };

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const userId = user && user.id ? user.id : null;  
      const username = user && user.full_name ? user.full_name : "Anonymous";
      ws.current.send(JSON.stringify({ 
        action: 'create_message', 
        message: messageInput, 
        username,
        userId 
      }));
      setMessageInput('');
    }
  };
  
  return (
     <div>
      {loading ? (
            <Loader visible={loading} />
          ) : (


      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }} className='rounded' >
        <div className='flex flex-col text-black'>

        {messages.length==0?(
      <div className='flex items-center justify-center m-4  h-96'>
      <h1 className='text-red-500 font-bold text-2xl'>Initiate a conversation and clarify your queries.</h1>
      </div>
    )  :(   
      messages.map((message, index) => (
        <div key={index} style={{ marginBottom: '5px', textAlign: message.user.id === user.id ? 'right' : 'left' }}>
          <div style={{ display: 'inline-block', backgroundColor: message.user.id === user.id ? '#dcf8c6' : '#ffffff', padding: '8px', borderRadius: '8px' }}>
            <div className=' flex'>
            <img
            src={`${baseUrl}${message.user.profile_pic}`}
            alt={`${message.user.full_name}'s Profile`}
            style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}
          />
            <strong>{message.user.full_name}:</strong>
            </div>
            {message.text}
          </div>
        </div>
      )))}
      
      
      <div className='flex items-center justify-center '>
        <input className='text-black' type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}
        />
        <button className='text-black border border-black px-2 rounded m-2 bg-[#1eb2a6]' onClick={sendMessage}>Send</button>
      </div>
    </div>
    </div>
          )}
    </div>
  );
};


export default ChatRoom;
