
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import "./userList.css"
import {  useParams } from "react-router-dom";
import moment from "moment";
import './message.css'



function ChatScreen() {

  let { state } = useContext(GlobalContext);

  const {id}= useParams();

  const [writeMessage, setWriteMessage] = useState("")
  const [conversation, setConversation] = useState(null)
  const [recipientProfile, setRecipientProfile] = useState({})

  const getRecipientProfile = async () => {

    try {
      let response = await axios.get(`${state.baseUrl}/profile/${id}`, {
        withCredentials: true
      })
     
      console.log("RecipientProfile", response)
      setRecipientProfile(response.data)

    } catch (error) {
      console.log("error", error)
    }
  }
  const getMessages = async () => {
      
    try {
      const response = await axios.get(`${state.baseUrl}/messages/${id}`)
      console.log("response", response.data)
      setConversation(response.data)

    } catch (error) {
      console.log("error in getting all messages", error)
    }

  }

  useEffect(() => {

    getRecipientProfile()
    getMessages();

  }, [])



  const sendMessage = async (e) => {
    if (e) e.preventDefault();

    try {
      const response = await axios.post(`${state.baseUrl}/message`,{
        to: id,
        text: writeMessage
      })
      console.log("response", response.data)

    } catch (error) {
      console.log("error in getting all messages", error)
    }

  }



  return (
    <div>
      <h1>Chat with {recipientProfile?.firstName} {recipientProfile?.lastName}</h1>
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="type your message" onChange={(e) => {
          setWriteMessage(e.target.value)
        }} />
        <button type="submit" >Send</button>
      </form>

      {(conversation?.length) ?
        conversation?.map((eachMessage, i) => {
          const className = (eachMessage?.from?._id === id) ? "recipientMessage" : "myMessage"
          return(
          <div key={i} 
          className={`message ${className}`}>
            <div className="head">
            <div className='name'>{eachMessage?.from?.firstName} </div>
            <div className='time'>{moment( eachMessage?.createdOn).fromNow()}</div>
            </div>
            <div className='text'>{eachMessage?.text}</div>
          </div>
            )
        }) 
        : null
      }
      {(conversation?.length === 0 ? "No Messages found" : null)}
      {(conversation === null ? "Loading..." : null)}




    </div>
  )

}

export default ChatScreen;