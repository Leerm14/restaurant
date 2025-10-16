import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Button from "../../components/Button.tsx";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const SignIn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [signInData, setSignInData] = useState<SignInFormData>({
    email: "",
    password: "",
    rememberMe: false,
    captcha: "",
  });
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleSignInChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sign In Data:", signInData);
    alert("Đăng nhập thành công!");
  };

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    console.log("Sign Up Data:", signUpData);
    alert("Đăng ký thành công!");
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
    // Handle Google sign in logic here
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-form-wrapper">
          <div className="signin-form">
            <h2 className="signin-title">
              {activeTab === "signin"
                ? "Chào mừng trở lại!"
                : "Tạo tài khoản mới!"}
            </h2>
            <p className="signin-subtitle">
              {activeTab === "signin"
                ? "Đăng nhập vào tài khoản để quản lý đơn hàng."
                : "Đăng ký tài khoản để trải nghiệm dịch vụ của chúng tôi."}
            </p>

            {/* Tab Navigation */}
            <div className="auth-tabs">
              <button
                className={`tab-button ${
                  activeTab === "signin" ? "active" : ""
                }`}
                onClick={() => setActiveTab("signin")}
              >
                Đăng nhập
              </button>
              <button
                className={`tab-button ${
                  activeTab === "signup" ? "active" : ""
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Đăng ký
              </button>
            </div>

            {/* Sign In Form */}
            {activeTab === "signin" && (
              <form
                onSubmit={handleSignInSubmit}
                className="signin-form-content"
              >
                <div className="form-group">
                  <label className="form-label">Email hoặc Tên đăng nhập</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập email hoặc tên đăng nhập của bạn"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="password-label-row">
                    <label className="form-label">Mật khẩu</label>
                    <Link to="/forgot-password" className="forgot-password">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={signInData.rememberMe}
                      onChange={handleSignInChange}
                    />
                    <span className="checkmark"></span>
                    Nhớ mật khẩu tự động đăng nhập sau này
                  </label>
                </div>

                <Button variant="primary" className="signin-button">
                  Đăng nhập
                </Button>

                <div className="divider">
                  <span>hoặc</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="google-signin-button"
                >
                  <i className="fab fa-google"></i>
                  Đăng nhập với Google
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === "signup" && (
              <form
                onSubmit={handleSignUpSubmit}
                className="signin-form-content"
              >
                <div className="form-group">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nhập họ và tên của bạn"
                    value={signUpData.fullName}
                    onChange={handleSignUpChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={signUpData.agreeTerms}
                      onChange={handleSignUpChange}
                      required
                    />
                    <span className="checkmark"></span>
                    Tôi đồng ý với{" "}
                    <Link to="/terms" className="forgot-password">
                      Điều khoản sử dụng
                    </Link>
                  </label>
                </div>

                <Button variant="primary" className="signin-button">
                  Đăng ký
                </Button>

                <div className="divider">
                  <span>hoặc</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="google-signin-button"
                >
                  <i className="fab fa-google"></i>
                  Đăng ký với Google
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
