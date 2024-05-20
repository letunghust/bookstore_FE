import React, { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/resetpassword?token=${token}`, { newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error when reset password!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmitResetPassword} className="space-y-6">
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset password
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
