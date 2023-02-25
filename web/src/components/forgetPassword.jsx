import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';

import axios from 'axios';
import './login.css'
import { Link } from "react-router-dom";




function ForgetPassword() {
    let { state, dispatch } = useContext(GlobalContext);


    const [result, setResult] = useState("");

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isOtpSent, setIsOtpSent] = useState(false);



    const sendOtp = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/forget-Password`, {
                email: email,
            }, {
                withCredentials: true
            })

            console.log(response.data.message);
            setResult(response.data.message)
            setIsOtpSent(true)

        } catch (e) {
            console.log("e: ", e);
        }
        // e.reset();
    }

    const updatePassword = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/forget-Password-2`, {
                email: email,
                otp: otp,
                newPassword: newPassword
            }, {
                withCredentials: true
            })

            console.log(response.data?.message);
            setResult(response.data?.message)
            

        } catch (e) {
            console.log("e: ", e);
            setResult(e.response?.data?.message)
        }
        // e.reset();
    }



    return (
        <>
            <h4>This is Forget Password page</h4>

            {state.text}


                {(!isOtpSent) ?
                    <form onSubmit={sendOtp} className="loginForm">
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
                        <button type="submit">SEND OTP</button>
                    </form>
                    :

                    <form onSubmit={updatePassword} className="loginForm">

                        <h2>{email}</h2>
                        <textarea
                            className="TextField"
                            id="otp"
                            label="OTP"
                            variant="outlined"
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            autoComplete="one-time-code"
                            onChange={(e) => { setOtp(e.target.value) }}
                        />
                        <br />

                        <textarea
                            className="TextField"
                            id="newPassword"
                            label="New password"
                            variant="outlined"
                            type="password"
                            name="newPassword"
                            placeholder="Enter a new password"
                            autoComplete="new-password"
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />
                        <br />
                        <button type="submit">UPDATE PASSWORD</button>
                    </form>

                }




          


            <p>{result}</p>
        </>
    )
}

export default ForgetPassword;