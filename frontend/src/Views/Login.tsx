import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useMessages, useAuthToken, useAuth, BASE_URL } from "../Utils/store";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const messages = useMessages((state) => state.msg);
  const setMsgs = useMessages((state) => state.setMsg);
  const setToken = useAuthToken((state) => state.setToken);
  const setAuthed = useAuth((state) => state.setAuthed);

  const alert = useAlert();

  useEffect(() => {
    if (messages !== "") {
      alert.success(messages);
    }

    setTimeout(() => {
      setMsgs("");
    }, 5000);
  }, [messages, setMsgs, setToken, alert]);

  const HandleLogin = async (e: React.FormEvent) => {
    await e.preventDefault();

    const requestBody = {
      username,
      password,
    };
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, requestBody);
      await setToken(res.data.token);
      await setAuthed(true);
      await setUsername("");
      await setPassword("");
      await window.location.replace("/home");
    } catch (err) {
      alert.error("Unable to Authenticate");
    }
  };
  return (
    <section className="login">
      <h1 className="login__title">Welcome to TreeMe</h1>
      <div className="login__form-container">
        <form action="" className="login__form" onSubmit={HandleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login__form__username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername((username) => e.target.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="login__form__password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword((password) => e.target.value)
            }
          />
          <input
            type="submit"
            value="Sign In"
            className="login__form__button"
          />
        </form>
        <div className="login__form__alternatives">
          <p>
            <Link className="React-Link" to="/register">
              Don't Have an Account? Sign Up
            </Link>
          </p>
          <p>Forgot Password?</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
