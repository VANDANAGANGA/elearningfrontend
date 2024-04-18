import React, { useEffect, useState } from "react";
import axios from "axios";
import Message from "./Message";
const Chat = () => {
    const [inputvalue,setInputValue]=useState('')
    const handleSendMessage=()=>{

    }
    return (
 <div className="border border-1 w-2/5">
    <div className="text-black"></div>
      <div className="overflow-y-auto flex-1 p-[20px] text-black">
        <Message text='Hey, how are you?' sent/>
        <Message text='i am good' recieved/>
    </div>
    <div className="flex m-2 p-4 h-1/5 justify-center items-center">
        <textarea className="p-[10px] flex-1 border rounded-[5px] mr-4 " placeholder="Type your message" value={inputvalue} onChange={(e)=>setInputValue(e.target.value)}/>
        <button className="bg-[#3498db] rounded-[5px] text-white px-4 py-2 w-[100px] h-[50px]" onClick={handleSendMessage}>send</button>
    </div>
 </div>
    )
};
export default Chat;