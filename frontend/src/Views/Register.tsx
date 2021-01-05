import React, { useState } from "react";
import { Link } from "react-router-dom";

const HandleRegister = async (e: React.FormEvent) => {
  await e.preventDefault();
};

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
