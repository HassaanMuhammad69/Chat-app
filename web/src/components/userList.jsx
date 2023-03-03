
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';



function Home() {

  let { state } = useContext(GlobalContext);

  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState(null)


  useEffect(() => {

    getUsers();

  }, [])



  const getUsers = async (e) => {
    if(e) e.preventDefault();

    try {
      const response = await axios.get(`${state.baseUrl}/users?q=${searchTerm}`)
      console.log("response: ", response.data);
      setUsers(response.data)

    } catch (error) {
      console.log("error in getting all user", error);
    }
  }



  return (
    <div>
      <h1>Search user to start the chat</h1>

      <form onSubmit={getUsers}>
        <input type="search" onChange={(e) => [
          setSearchTerm(e.target.value)
        ]} />
        <button>Search</button>
      </form>

      {(users?.length) ?
        users?.map((eachUser, index) => {
         return <div key={index}>
            <h2>{eachUser?.firstName} {eachUser?.lastName}</h2>
            <span>{eachUser?.email}</span>
          </div>
        })
        : null
      }
      {(users?.length === 0 ? "No user found" : null)}
      {(users === null ? "Loading.." : null)}




    </div >

  );
}

export default Home;