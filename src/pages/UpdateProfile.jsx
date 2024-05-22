import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ButtonClose from "../components/ButtonClose";

const token = localStorage.getItem("token");
const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // State cho modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState('');
  const defaultAvatar =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png";

  // get user data
  const fetchUserData = async () => {
    try {
      // const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`
        );
        const data = await response.json();
        setUser(data);
        setName(data.name);
        setPhone(data.phone);
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
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/changepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        }
      );

      const data = await response.json();
      // console.log(data);
      alert(data.message);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit edit profile
  const handleSubmitEditProfile = async () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({ name, phone }),
          }
        );

        const data = await response.json();
        console.log(data);
        // console.log(data.success)
        alert("Profile updated successfully");
        handleCloseEditModal();
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle change avatar 
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      if(token) {
        // const decodedToken = jwtDecode(token);
        // const userId = decodedToken._id;
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/uploadavatar`, {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
          },
          body: formData,
        });

        const data = await response.json();
        console.log(data); 
        if(data.success) {
          setAvatar(data.avatar);
          fetchUserData();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }
    } catch(error) {
      console.log(error);
    }
  }

  // modal change password
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // modal edit profile
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="max-w-xl  mx-auto my-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
      </div>
      <div className="p-6">
        {user ? (
          <>
            <div className="flex">
              <div>
                {/* <h1>Avatar</h1> */}
                <img
                  src={user.avatar || defaultAvatar}
                  className="w-24 h-24 rounded-full object-cover mr-4"
                />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="mt-2"/>
              </div>
              <div>
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
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={handleOpenModal} // Gọi hàm mở modal khi nhấn vào nút "Change Password"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Change Password
              </button>
              <button
                onClick={handleOpenEditModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300"
              >
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
      {/* Modal change password*/}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
            {/* Modal content */}
            <div className="relative bg-white w-full rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Close button */}
              <ButtonClose onClick={handleCloseModal} />
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

      {/* Modal edit profile */}
      {showEditModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
            <div className="relative bg-white w-full rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Icon close modal */}
              <ButtonClose onClick={handleCloseEditModal} />
              <div className="p-8">
                {/* Form để edit thông tin người dùng */}
                <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                {/* Input fields để người dùng nhập thông tin mới */}
                {/* name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* Phone number  */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSubmitEditProfile}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Save Changes
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
