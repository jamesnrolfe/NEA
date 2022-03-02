import React from "react";
import axios from "axios";

import LoginPage from "./loginpage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hash from "../../processes/create_hash";

import { addUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const LoginPageContainer = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const makeRequest = data => {
        axios
            .post("http://localhost:3001/api/users/verify", {
                username: data.uname,
                pw_hash: hash(data.pword),
            })
            .then(result => {
                if (result.data.length === 0) {
                    // if there are no users matching the data
                    handleError("No users found");
                } else {
                    // otherwise we must be correct in which case we need to find the correct user
                    handleMessage("Logging in...");
                    axios
                        .post("http://localhost:3001/api/users/get", {
                            method: "id", // since we have the id, we can use this method
                            fetch: result.data[0].user_id,
                        })
                        .then(result => {
                            dispatch(
                                addUser({
                                    // add the user to the redux store
                                    id: result.data[0].user_id,
                                    username: result.data[0].username,
                                    location: result.data[0].location,
                                    bio: result.data[0].bio,
                                    age: result.data[0].age,
                                })
                            );
                        });
                    redirectUser(); // send the user to the homepage
                }
            });
    };

    const handleError = message => {
        setMessage("");
        setError(message);
    };

    const handleMessage = message => {
        setError("");
        setMessage(message);
    };

    const redirectUser = () => {
        navigate("/");
    };

    return <LoginPage submitAction={makeRequest} error={error} message={message} />;
};

export default LoginPageContainer;
