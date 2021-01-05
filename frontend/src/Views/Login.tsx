import React, { useState } from "react";
import { Link } from "react-router-dom";

const HandleLogin = async (e: React.FormEvent) => {
  await e.preventDefault();
};

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
