import React, { useState } from "react";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaFacebookF,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa6";

const SocialIcon = ({ Icon }) => (
  <div
    className="h-10 w-10 rounded-full flex justify-center items-center p-2 border-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
    aria-label="Social Media Login Icon"
  >
    <Icon className="text-white text-xl" />
  </div>
);

const InputField = ({ type, placeholder, value, onChange, extraProps }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="bg-gray-200 rounded-lg text-black p-4 w-80 focus:outline-none focus:ring-2 focus:ring-[#4c51c6] transition-all"
    value={value}
    onChange={onChange}
    {...extraProps}
  />
);

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:8080/api/v1/auth";
    const userData = isLogin
      ? { email, password, isLogin: true }
      : { name, email, password, isLogin: false };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`${isLogin ? "Login" : "Register"} successful`);
        localStorage.setItem("token", data.token); // Save token to localStorage
        window.location.href = "/"; // Redirect to home page
      } else {
        console.error(`${isLogin ? "Login" : "Register"} failed`, data.message);
        alert(data.message); // Show error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again."); // Show generic error message
    }
  };

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
    
  };

  return (
    <div className="max-w-6xl mx-auto my-10 bg-[#1e1e2e] text-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="relative flex flex-wrap md:flex-nowrap items-center h-[600px]">
        {/* Sliding Section */}
        <div
          className={`absolute w-full md:w-1/2 h-full bg-[#4c51c6] text-white flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {isLogin ? (
            <>
              <h2 className="text-4xl font-bold">Welcome Back!</h2>
              <p className="text-center mt-2 px-4">
                To stay connected with us, login with your personal details.
              </p>
              <button
                className="mt-10 border border-white rounded-full py-3 px-10 font-bold hover:bg-white hover:text-[#4c51c6] transition-all"
                onClick={toggleLoginRegister}
              >
                SIGN UP
              </button>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold">Hello, Friend!</h2>
              <p className="text-center mt-2 px-4">
                Start your journey with us by creating an account.
              </p>
              <button
                className="mt-10 border border-white rounded-full py-3 px-10 font-bold hover:bg-white hover:text-[#4c51c6] transition-all"
                onClick={toggleLoginRegister}
              >
                SIGN IN
              </button>
            </>
          )}
        </div>

        {/* Form Section */}
        <div
          className={`w-full md:w-1/2 h-full bg-[#1e1e2e] flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-4xl font-bold text-[#8c93ff]">
            {isLogin ? "Sign In" : "Create an Account"}
          </h2>
          <div className="flex gap-5 mt-5">
            <SocialIcon Icon={FaFacebookF} />
            <SocialIcon Icon={FaGooglePlusG} />
            <SocialIcon Icon={FaLinkedinIn} />
          </div>
          <p className="mt-5 text-gray-300">
            {isLogin ? "or use your account" : "or register with email"}
          </p>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4 mt-5"
          >
            {!isLogin && (
              <InputField
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            {isLogin && (
              <p className="text-sm text-gray-400 mt-2 cursor-pointer hover:underline">
                Forgot your password?
              </p>
            )}
            <button
              type="submit"
              className="bg-[#4c51c6] text-white rounded-full py-3 px-10 font-bold hover:bg-[#3b3fa3] transition-all"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
