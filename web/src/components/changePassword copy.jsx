import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';

import axios from 'axios';
import './login.css'



function ChangePassword() {
    let { state, dispatch } = useContext(GlobalContext);


    const [result, setResult] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");


    const proceedChangePassword = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/change-password`, {

                currentPassword: currentPassword,
                password: password
            }, {
                withCredentials: true
            })

            console.log("Password change successful");
            setResult("Password change successfully")
            e.reset();

        } catch (e) {
            console.log("e: ", e);
        }
    }



    return (
        <>
            <h4>This is ChangePassword page</h4>

            {state.text}

            <form onSubmit={proceedChangePassword} className="loginForm">


                <textarea
                    className="TextField"
                    id="current Password"
                    label="Current Password"
                    variant="outlined"
                    type="password"
                    name="current-password"
                    placeholder="Enter your current Password"
                    autoComplete="current-password"
                    onChange={(e) => { setCurrentPassword(e.target.value) }}
                />


                <br />

                <textarea
                    className="TextField"
                    id="new-password"
                    label="New Password"
                    variant="outlined"
                    type="password"
                    name="new-password"
                    autoComplete="new-password"
                    placeholder="New password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />

                <textarea
                    className="TextField"
                    id="confirm-password"
                    label="New Password"
                    variant="outlined"
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder="confirm password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <button type="submit">ChangePassword</button>

            </form>

            <p>{result}</p>
        </>
    )
}

export default ChangePassword;