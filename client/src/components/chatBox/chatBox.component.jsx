import './chatBox.style.css';
import socketClient from "socket.io-client";
import axios from 'axios'
const SERVER = "http://127.0.0.1:5000";
var socket = socketClient(SERVER,{autoConnect : true});
const test='./logo512.png';

const onChangeEvent=(event)=>{

}

function scrollBarToBottom() {
    const scrollBar =document.querySelector('.chatHere');
    scrollBar.scrollTop = scrollBar.scrollHeight - scrollBar.clientHeight;
}
const addMessageIntoChatbox = (message,classToBeAdded)=>{
    const newDiv=document.createElement('div');
    newDiv.innerHTML=`<div class="onBothSide ${classToBeAdded}">
                        ${message}
                    </div>`;
    document.querySelector('.chatHere').append(newDiv);
    scrollBarToBottom();
}

const sendMessage = async (event)=>{
    const message = event.target.closest('.rightBlockFooter').querySelector('.chatInput').value;
    if(message == ""){
        return ;
    }
    var reciever = document.querySelector(".right-username").textContent;
    addMessageIntoChatbox(message,'fromYou')
    document.querySelector('.chatInput').value = "";
    try{
        const response = await axios({
            method : 'POST',
            url : 'http://localhost:5000/v1/chat/createChat',
            data : {
                message,
                reciever,
            },
            params:{
                token: localStorage.getItem("token")
            }
        })
        if(response.status == "200"){
            socket.emit('messageFromClient',{
                message,
            })
        }
    }catch{

    }
    var roomId = localStorage.getItem("roomId");
    socket.emit('messageFromClient',{ message,roomId});
}

socket.on('messageFromServer',serverData=>{
    const roomId = localStorage.getItem("roomId");
    if(roomId === serverData.roomId){   
        addMessageIntoChatbox(serverData.message,'fromMyFriends')
    }
});

const sendMessageKey = (event)=>{
    if(event.code === "Enter"){
        document.querySelector('.chatSubmitBtn').click();
    }
}

export const connectRoom = ()=>{
    var roomId = localStorage.getItem("roomId");
    socket.emit("joinToRoom",roomId);
}

export const P2PChatBox = (username)=>{
    return (
        <div className="P2PChatBox">
            <div className="rightBlockHeader"> 
                <img className="right-avatar" src={test} alt="" />
                <span className="extraWith"> 
                    <div className="right-username">
                        notChatting
                    </div>
                </span>
            </div>
            <div className="chatHere">
               
            </div>
            <div className="rightBlockFooter">
                <input onKeyPress={sendMessageKey} onChange={onChangeEvent} className="chatInput" type="text" />
                <input onClick={sendMessage} value="send" className="chatSubmitBtn" type="submit" name="" id="" />
            </div>
        </div>
    )
}