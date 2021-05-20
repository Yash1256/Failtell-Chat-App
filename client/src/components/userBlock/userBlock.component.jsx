import './userBlock.style.css'
import axios from 'axios'
import { FriendFilter } from "./../searchBar/search.component";

import {connectRoom} from './../chatBox/chatBox.component'
const ok='./logo512.png';

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

const getchat = async (reciever)=> {
    try{
        const res = await axios({
            method : 'GET',
            url : 'http://localhost:5000/v1/chat/getUserChats',
            params : {
                token : localStorage.getItem("token"),
                reciever
            }
        })
        var recieverId = "";
        const response = await axios({
            method : 'POST',
            url : 'http://localhost:5000/v1/users/getMe',
            data : {
                reciever
            },
            params:{
                token : localStorage.getItem("token"),
            }
        })
        if(response.status == '200'){
            recieverId = response.data.data;
        }
        if(res.status == '200'){
            document.querySelector('.chatHere').innerHTML = "";
            for(var i=0 ; i<res.data.getChat.length ; i++){
                if(recieverId == res.data.getChat[i].reciever){
                    addMessageIntoChatbox(res.data.getChat[i].message,"fromYou");
                }else{
                    addMessageIntoChatbox(res.data.getChat[i].message,"fromMyFriends");
                }
            }
        }
    }catch{

    }
}

const roomId = async (reciever)=>{
    try{
        const response = await axios({
            method : 'POST',
            url : `http://localhost:5000/v1/users/assignRoom/${reciever}`,
            params:{
                token : localStorage.getItem("token")
            }
        })
        if(response.status == "200"){
            localStorage.setItem("roomId",response.data.roomId);
        }
    }catch{
        console.log('Line Number 18');
    }
}

const getBuddyName = (event)=>{
    const buddyName = event.target.closest(".LeftBlockUserCard").querySelector(".userName").textContent;
    document.querySelector('.right-username').textContent=buddyName;    
    roomId(buddyName);
    connectRoom();
    getchat(buddyName);
}

export const LeftBlockUserCard = (props)=>(
    <div className="outside">
    <FriendFilter />
    {props.recentChat.map(ele=>(
        <div className="LeftBlockUserCard" onClick={getBuddyName}>
        <img className="user-avatar" src={ok} alt="" />
        <span className="extraData"> 
            <div className="userName">
                {ele.chatUsername}
            </div>
        </span>
        <br />
        </div>  
        
    ))}
 </div>
)