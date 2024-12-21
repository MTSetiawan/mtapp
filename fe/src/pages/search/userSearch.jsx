/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/search`,
            {
              params: { q: searchQuery },
            }
          );
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  console.log(users);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Search users..."
      />
      {users.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded bg-white">
          {users.map((user) => (
            <Link key={user.id}>
              <li to className="p-2 cursor-pointer hover:bg-gray-100">
                {user.username}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserSearch;
