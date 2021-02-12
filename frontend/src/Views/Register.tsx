import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMessages, BASE_URL } from "../Utils/store";
import { useAlert } from "react-alert";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const setMsg = useMessages((state) => state.setMsg);
  const alert = useAlert();

  const HandleRegister = async (e: React.FormEvent) => {
    setMsg("User Created Successfully");
    await e.preventDefault();
    const requestBody = {
      username,
      email,
      password,
    };

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, requestBody);
      setMsg("User Created Successfully");
      setEmail("");
      setPassword("");
      setUsername("");
      await window.location.replace("/login");
    } catch (err) {
      alert.error("There was an Error user not created");
    }
  };

  return (
    <section className="register">
      <h1 className="register__title">Welcome to TreeMe</h1>
      <div className="register__form-container">
        <form action="" className="register__form" onSubmit={HandleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="register__form__username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername((username) => e.target.value)
            }
          />
          <input
            type="email"
            placeholder="E-mail"
            className="register__form__email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail((email) => e.target.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="register__form__password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword((password) => e.target.value)
            }
          />
          <input
            type="submit"
            value="Sign Up"
            className="register__form__button"
          />
        </form>
        <div className="register__form__alternatives">
          <p>
            <Link to="/login" className="React-Link">
              Already Have an Account? Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
