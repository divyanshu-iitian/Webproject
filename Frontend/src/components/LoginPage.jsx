import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components for Modal
const Overlay = styled.div.attrs({
  className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", // Dimmed background
})``;

const DialogBox = styled.div.attrs({
  className: "bg-white rounded-lg p-8 shadow-lg max-w-md w-full relative", // Login modal
})``;

const CloseButton = styled.button.attrs({
  className: "absolute top-3 right-3 text-gray-500 hover:text-black", // Close button
})``;

const Input = styled.input.attrs({
  className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3", // Styled inputs
})``;

const Select = styled.select.attrs({
  className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3", // Styled dropdown
})``;

const Button = styled.button.attrs({
  className: "w-full bg-blue-500 text-white p-3 rounded-md mt-5 hover:bg-blue-600", // Submit button
})``;

export default function LoginPage({ setIsLoginDialogOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling when modal is open

    return () => document.body.style.overflow = "auto"; // Clean up on unmount
  }, []);

  return (
    <Overlay>
      <DialogBox>
        <CloseButton onClick={() => setIsLoginDialogOpen(false)}>&times;</CloseButton>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login to Your Account</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your credentials to log in.
        </p>
        <form>
          <Input type="email" placeholder="Email Address" />
          <Input type="password" placeholder="Password" />
          
          {/* Role Dropdown */}
          <Select>
            <option value="">Select Role</option>
            <option value="moderator">Moderator</option>
            <option value="college authority">College Authority</option>
          </Select>
          
          <Button type="submit">Login</Button>
        </form>
      </DialogBox>
    </Overlay>
  );
}
