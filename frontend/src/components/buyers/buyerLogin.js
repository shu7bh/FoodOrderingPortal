import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../reusables/Login"

const BuyerLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); }

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        console.log(email + ' + ' + password);
        const checkUser = {
            email: email,
            password: password
        };

        axios
            .post("/api/buyer/login", checkUser)
            .then(() => {
                alert("Login Successful");
                resetInputs();
                navigate("/buyer/dashboard");
                localStorage.setItem("user", checkUser.email);
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    };

    return (
        <Login email={email} password={password} onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} onSubmit={onSubmit} />
    );
};

export default BuyerLogin;
