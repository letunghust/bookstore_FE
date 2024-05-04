import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // State cho modal
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // get user data 
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`
        );
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  // end of get user data

  // handle submit change password
  const handleSubmitChangePassword = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/changepassword`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
      });

      const data = await response.json();
      // console.log(data);
      alert(data.message);
      setShowModal(false)
    } catch(error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
      </div>
      <div className="p-6">
        {user ? (
          <>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Full Name:</p>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Phone Number:</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={handleOpenModal} // Gọi hàm mở modal khi nhấn vào nút "Change Password"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Change Password
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 inline"
              viewBox="0 0 24 24"
            >
              {/* SVG spinner icon */}
            </svg>
            <span className="text-gray-700">Loading...</span>
          </div>
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
            {/* Modal content */}
            <div className="relative bg-white w-full rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Close button */}
              <button
                onClick={handleCloseModal} // Gọi hàm đóng modal khi nhấn vào nút đóng
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Modal content */}
              <div className="p-8">
                {/* Form để người dùng nhập mật khẩu */}
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                {/* Current password */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current Password:
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                {/* New password */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    New Password:
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSubmitChangePassword}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
