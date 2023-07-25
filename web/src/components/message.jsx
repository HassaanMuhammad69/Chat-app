
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import "./userList.css"
import {  useParams } from "react-router-dom";



function ChatScreen() {

  let { state } = useContext(GlobalContext);

  const {id}= useParams();

  const [writeMessage, setWriteMessage] = useState("")
  const [users, setUsers] = useState(null)



  useEffect(() => {

   

  }, [])

  const sendMessage = async (e) => {
    if (e) e.preventDefault();

    try {
      const response = await axios.post(`${state.baseUrl}/message`,{
        to: id,
        text: writeMessage
      })
      console.log("response", response.data)
      setUsers(response.data)

    } catch (error) {
      console.log("error in getting all messages", error)
    }

  }



  return (
    <div>
      <h1>Chat Screen</h1>
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="type your message" onChange={(e) => {
          setWriteMessage(e.target.value)
        }} />
        <button type="submit" >Send</button>
      </form>

      {(users?.length) ?
        users?.map((eachUser, i) => {
          return(
          <div className='userListItem' key={i}>
            <h2>{eachUser.firstName} {eachUser.lastName}</h2>
            <span>{eachUser.email}</span>
            {(eachUser?.me)? <span> <br/> this is me</span> : null}
          </div>)
        })
        : null
      }
      {(users?.length === 0 ? "No user found" : null)}
      {(users === null ? "Loading..." : null)}




    </div>
  )

}

export default ChatScreen;