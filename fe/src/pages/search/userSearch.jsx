import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const UserSearch = () => {
  const [users, setUsers] = useState([]); // Daftar pengguna
  const [searchQuery, setSearchQuery] = useState(""); // Untuk menyimpan query pencarian
  const [filteredUsers, setFilteredUsers] = useState([]); // Pengguna yang sudah difilter
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const data = useLoaderData();

  // Fungsi untuk mengambil data pengguna
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/search`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Gunakan useEffect untuk memanggil fetchUsers hanya sekali saat komponen pertama kali dimuat
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fungsi untuk menangani pencarian pengguna
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers([]);
    } else {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]); // Menjalankan efek saat pencarian atau data pengguna berubah

  return (
    <div className="flex-grow p-4 min-h-screen bg-gray-200 ml-64">
      <Navbar user={data} />

      {/* Input Pencarian */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 input bg-gray-100 border shadow-lg text-black"
      />

      {/* Tampilkan hasil pencarian */}
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => navigate(`/profile/${user.id}`)}
            className="flex items-center space-x-4 p-3 bg-white hover:bg-gray-100 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            <div className="avatar">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={user.profile_image}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              {user.username}
            </span>
          </button>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserSearch;
