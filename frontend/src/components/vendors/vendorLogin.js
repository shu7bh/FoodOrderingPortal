import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../reusables/Login"

const VendorLogin = (props) => {
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

        const checkUser = {
            email: email,
            password: password
        };

        axios
            .post("http://localhost:4000/vendor/login", checkUser)
            .then(() => {
                alert("Login Successful");
                resetInputs();
                localStorage.setItem("user", checkUser.email);
                navigate("/vendor/dashboard");
            })
            .catch(() => {
                alert("Login Failed");
                resetInputs();
            });
    };

    return (
        <Login
            onSubmit={onSubmit}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            email={email}
            password={password}
        />
    );
};

export default VendorLogin;
