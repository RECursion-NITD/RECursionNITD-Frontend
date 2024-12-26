import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import signup from "../assets/images/Vector.png";
import lock from "../assets/images/Vector1.png";
import msg from "../assets/images/Vector2.png";
import frame from "../assets/images/Frame_signup.png";

const Signup = () => {
  const navigate = useNavigate();
  const { signupUser, status } = useAuth();
  const { loading, setLoading } = useLoading();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signupUser(formData);
    setLoading(false);
    navigate("/login");
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      style={{
        background: "linear-gradient(0deg, #282727 0%, #1A1A1A 62%)",
      }}
    >
      <div className="w-96 p-8 bg-background rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src={frame}
            alt="Sign Up"
            className="w-27 h-24 rounded-full mb-4"
          />
          <h2 className="text-white mb-6 text-2xl font-head">Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {/* Username Field with Icon in Box */}
            <div className="flex items-center border border-primary rounded bg-gray-700">
              <div className="p-2">
                <img src={signup} alt="Username Icon" className="w-6 h-6" />
              </div>
              <div className="h-10 w-px bg-primary mx-2"></div>
              <input
                placeholder="Username"
                className="bg-transparent text-white p-2 w-full outline-none"
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                disabled={status === "submitting"}
              />
            </div>

            {/* Email Field with Icon in Box */}
            <div className="flex items-center border border-primary rounded bg-gray-700">
              <div className="p-2">
                <img src={msg} alt="Email Icon" className="w-6 h-6" />
              </div>
              <div className="h-10 w-px bg-primary mx-2"></div>
              <input
                placeholder="Email"
                className="bg-transparent text-white p-2 w-full outline-none"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                disabled={status === "submitting"}
              />
            </div>

            {/* Password Field with Icon in Box */}
            <div className="flex items-center border border-primary rounded bg-gray-700">
              <div className="p-2">
                <img
                  src={lock}
                  alt="Confirm Password Icon"
                  className="w-6 h-6"
                />
              </div>
              <div className="h-10 w-px bg-primary mx-2"></div>
              <input
                placeholder="Password"
                className="bg-transparent text-white p-2 w-full outline-none"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                disabled={status === "submitting"}
              />
            </div>

            {/* Confirm Password Field with Icon in Box */}
            <div className="flex items-center border border-primary rounded bg-gray-700">
              <div className="p-2">
                <img
                  src={lock}
                  alt="Confirm Password Icon"
                  className="w-6 h-6"
                />
              </div>
              <div className="h-10 w-px bg-primary mx-2"></div>
              <input
                placeholder="Confirm Password"
                className="bg-transparent text-white p-2 w-full outline-none"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                disabled={status === "submitting"}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-primary hover:bg-secondary text-onPrimary rounded p-2 mt-4 transform transition-all duration-200 disabled:opacity-50"
                style={{ width: "290px" }}
                type="submit"
                disabled={status === "submitting"}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
