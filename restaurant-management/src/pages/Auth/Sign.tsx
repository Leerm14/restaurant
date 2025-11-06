import React, { useState } from "react";
import "./sign.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getAuth } from "firebase/auth";
const Sign: React.FC = () => {
  const [rightActive, setRightActive] = useState(false);

  return (
    <div className="body-sign">
      <div
        className={`container-sign ${rightActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-user" aria-hidden />
              </span>
              <input type="text" placeholder="Name" />
            </div>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-envelope" aria-hidden />
              </span>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-phone" aria-hidden />
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                aria-label="Phone number"
                pattern="[0-9]{9,12}"
                required
              />
            </div>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-lock" aria-hidden />
              </span>
              <input type="password" placeholder="Password" />
            </div>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-lock" aria-hidden />
              </span>
              <input type="password" placeholder="Confirm Password" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social" aria-label="facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social" aria-label="google">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social" aria-label="linkedin">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <span>or use your account</span>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-envelope" aria-hidden />
              </span>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-lock" aria-hidden />
              </span>
              <input type="password" placeholder="Password" />
            </div>
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Chào mừng trở lại</h1>
              <p>Rất vui được gặp lại! Quản lý đặt chỗ của bạn tại đây</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setRightActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Xin chào</h1>
              <p>
                {" "}
                Tạo tài khoản mới. Trải nghiệm đặt bàn nhanh chóng và dễ dàng
                hơn.
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setRightActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
