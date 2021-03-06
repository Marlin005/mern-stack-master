import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/Auth.context";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div>
      <div className="row">
        <div className="col s6 offset-s3">
          <h2>Сократи ссылку</h2>

          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Authorisation</span>
              <div>
                <div className="input-field">
                  <input
                    placeholder="Enter email"
                    id="email"
                    type="email"
                    autoComplete="off"
                    name="email"
                    className="yellow-input"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">First Name</label>
                </div>
                <div className="input-field">
                  <input
                    placeholder="Enter password"
                    id="password"
                    type="password"
                    autoComplete="off"
                    name="password"
                    className="yellow-input"
                    onChange={changeHandler}
                    value={form.password}
                  />
                  <label htmlFor="password">First Name</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{ marginRight: "10px" }}
                disabled={loading}
                onClick={loginHandler}
              >
                Enter
              </button>
              <button
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
