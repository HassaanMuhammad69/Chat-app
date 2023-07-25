import { useContext, useEffect } from "react";
import { GlobalContext } from './context/Context';
import axios from "axios";


import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";


// import Home from "./components/home";
import About from "./components/about";
// import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";
import ChangePassword from "./components/changePassword copy"
import ForgetPassword from "./components/forgetPassword";
import Userlist from "./components/userList";
import ChatScreen from "./components/message";






//iubibib
function App() {

  let { state, dispatch } = useContext(GlobalContext);
  // const [fullName, setFullName] = useState("");


  console.log("State", state)
  const logoutHandler = async () => {
    try {
      let response = await axios.post(`${state.baseUrl}/logout`,
        {},
        {
          withCredentials: true
        })
      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error", error)
    }
  }


  useEffect(() => {


    const getProfile = async () => {

      try {
        let response = await axios.get(`${state.baseUrl}/profile`, {
          withCredentials: true
        })
        dispatch({
          type: 'USER_LOGIN',
          payload: response.data
        })
      } catch (error) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }

    }
    getProfile()
  }, [])

  useEffect(() => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.withCredentials= true;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }
      return Promise.reject(error);
    });
  })


  return (
    <div>

      {
        (state.isLogin === true) ?
          <nav className='navBar'>
            <ul >
              <li> <Link to={`/`}>Home</Link> </li>
              <li> <Link to={`/about`}>Profile</Link> </li>
              <li> {state.user.firstName} <button onClick={logoutHandler}>Logout</button> </li>
            </ul>
          </nav>
          : null}

      {
        (state.isLogin === false) ?
          <nav className='navBar'>
            <ul >
              <li> <Link to={`/`}>Login</Link> </li>
              <li> <Link to={`/signup`}>Signup</Link> </li>
            </ul>
          </nav>
          : null
      }

      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Userlist/>} />
          <Route path="about" element={<About />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

      {(state.isLogin === false) ?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null
      }

      {(state.isLogin === null) ?
        <div> Splash screen</div>
        : null}


    </div>
  );
}

export default App;