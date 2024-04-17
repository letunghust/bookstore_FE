import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
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
        console.log(data);
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Your Profile</h1>
      {/* {user && (
        <>
          <div>
            <p>Full Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phone}</p>

          </div>
        </>
      )} */}
      {user ? (
        <>
          <div>
            <p>Full Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phone}</p>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UpdateProfile;
