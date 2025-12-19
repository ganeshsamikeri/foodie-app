import React, { useState, useEffect } from "react";
import "./LoginPopup.css";

const LoginPopup = ({ onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // disable scroll when popup opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp && !formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Please enter all required fields.");
      return;
    }

    const userData = {
      name: isSignUp ? formData.name : "User",
      email: formData.email,
    };

    alert(isSignUp ? "Account created successfully 🎉" : "Welcome back 👋");
    if (onLogin) onLogin(userData);
    onClose();
  };

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      alert("Enter valid 10-digit number");
      return;
    }
    alert("OTP Sent ✔️");
    setStep(3);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      alert("Enter 4-digit OTP");
      return;
    }
    alert("Login Successful 🎉");
    onClose();
  };

  const handleSocial = (provider) => {
    alert(`Continue with ${provider}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* MAIN LOGIN PAGE */}
        {step === 1 && (
          <>
            <div className="popup-header">
              <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
              <p>{isSignUp ? "Join FOODIE today 🍔" : "Sign in to continue 🍕"}</p>
            </div>

            <form className="popup-form" onSubmit={handleSubmit}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="popup-btn">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="divider"><span>OR</span></div>

            <p className="signin-using">Sign in using:</p>

            <div className="social-icons">
              <div className="icon google" onClick={() => handleSocial("Google")}>
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="google" />
              </div>
              <div className="icon facebook" onClick={() => handleSocial("Facebook")}>
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="fb" />
              </div>
              <div className="icon twitter" onClick={() => handleSocial("Twitter")}>
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="twitter" />
              </div>
            </div>

            <button className="phone-btn" onClick={() => setStep(2)}>
              📱 Continue with Phone
            </button>

            <p className="switch-text">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <span onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </>
        )}

        {/* PHONE NUMBER PAGE */}
        {step === 2 && (
          <div className="otp-section">
            <h2>Login with Phone</h2>
            <p>Enter your mobile number to receive OTP</p>

            <div className="phone-box">
              <span className="cc">+91</span>
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button className="popup-btn" onClick={handleSendOtp}>Send OTP</button>
            <p className="back" onClick={() => setStep(1)}>← Back</p>
          </div>
        )}

        {/* OTP PAGE */}
        {step === 3 && (
          <div className="otp-section">
            <h2>Verify OTP</h2>
            <p>OTP sent to +91 {phone}</p>

            <input
              type="number"
              className="otp-input"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 4))}
            />

            <button className="popup-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>

            <p className="resend">
              Didn't receive? <span>Resend OTP</span>
            </p>

            <p className="back" onClick={() => setStep(2)}>← Back</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
