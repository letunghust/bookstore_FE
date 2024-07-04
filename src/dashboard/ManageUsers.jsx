import axios from "axios";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/all-users`
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // block user
  const handleToggleBlock = async (userId, isBlocked) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blockuser/${userId}`,
        {
          isBlocked: !isBlocked,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Error updating user block status", error);
    }
  };

  // update role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/userRole/${userId}`,
        {
          role: newRole,
        }
      );

      if (response.status === 200) {
        // Cập nhật trạng thái người dùng trên giao diện sau khi cập nhật thành công
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Block</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="border-t">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 text-center">
                <Switch
                  checked={user.isBlocked}
                  onChange={() => handleToggleBlock(user._id, user.isBlocked)}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                />
              </td>
              {/* <td className="py-2 px-4">{user.role}</td> */}
              <td className="py-2 px-4">
                <select
                  value={user.role}
                  onChange={(e) => {
                    console.log('Role changed:', e.target.value);
                    handleRoleChange(user._id, e.target.value)}
                  }
                >
                  <option value="user"> User </option>
                  <option value="cashier"> Cashier </option>
                  <option value="admin"> Admin </option>
                </select>
              </td>
              <td className="py-2 px-4">
                {/* <button className="bg-blue-500 text-white px-4 py-1 rounded">
                  Edit
                </button> */}
                <button className="bg-red-500 text-white px-4 py-1 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded">1</button>
        {/* Add pagination logic here */}
      </div>
    </div>
  );
};

export default ManageUsers;
