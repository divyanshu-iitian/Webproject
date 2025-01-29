import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupRequest, signupSuccess, signupFailure } from "./redux/authSlice";
import axios from "axios";

export default function SignupPage({ isOpen, onClose }) {
  if (!isOpen) return null; // Do not render if the modal is not open

  const dispatch = useDispatch();

  // State for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Form validation (basic example)
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Dispatch signup request
    dispatch(signupRequest());

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/register", {
        fullName,
        email,
        phoneNumber,
        password,
        role,
      });

      // On successful signup
      dispatch(signupSuccess({ user: response.data.user, token: response.data.token }));
      onClose(); // Close the modal
    } catch (error) {
      // On error
      dispatch(signupFailure(error.response?.data?.message || "An error occurred"));
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Fill in the details below to create your account.
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
          )}

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <select
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="moderator">Moderator</option>
              <option value="college authority">College Authority</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md mt-5 hover:bg-blue-700 transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

