import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/forgotpassword?email=${email}`
      );
      setMessage(
        response.data.success ? "Sent email" : "Error when sending mail"
      );
    } catch (error) {
      console.log(error);
      setMessage("Error when sending mail");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmitForgotPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
