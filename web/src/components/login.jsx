import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';

import axios from 'axios';
import './login.css'
import { Link } from "react-router-dom";




function Login() {
    let { state, dispatch } = useContext(GlobalContext);


    const [result, setResult] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/login`, {

                email: email,
                password: password
            }, {
                withCredentials: true
            })

            dispatch({
                type: 'USER_LOGIN',
                payload: response.data.profile
            })

            console.log("Login successful");
            setResult("Login successful")

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }



    return (
        <>
            <h4>This is Login page</h4>

            {state.text}

            <form onSubmit={loginHandler} className="loginForm">


                <textarea
                    className="TextField"
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    placeholder="email"
                    autoComplete="username"
                    onChange={(e) => { setEmail(e.target.value) }}
                />


                <br />

                <textarea
                    className="TextField"
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="current-password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <button type="submit">Login</button>

            </form>
            <br/>
            <button>
            <Link to={`/forget-password`}>Forget Password</Link>
            </button>

            <p>{result}</p>
        </>
    )
}

export default Login;