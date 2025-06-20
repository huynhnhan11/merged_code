import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../style/login.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    navigate("/patients");
  };

  return (
    <div className="login-wrapper">
      <img src="src/assets/logo-txt.png" alt="Logo" className="login-logo" />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button className="btn-login" type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}
