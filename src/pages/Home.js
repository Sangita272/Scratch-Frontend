import React, { useCallback, useEffect, useState } from "react";
import { usersDelete, usersList } from "../services/loginService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [list, setList] = useState([]);
  const headers = ["First Name", "Last Name", "Email", "Actions"];
  const navigate = useNavigate();
  const loadList = useCallback(() => {
    usersList({})
      .then((res) => {
        if (res && res.data.status === 200) {
          setList(res.data.docs);
        }
      })
      .catch((error) => console.error("Error loading user list:", error));
  }, []);


  useEffect(() => {
    loadList();
  }, [loadList]);

  const deleteData = (id) => {
    usersDelete({ id })
      .then((res) => {
        if (res && res.data.status === 200) {
          loadList();
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management(CRUD)</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
          onClick={() => navigate("/add")}
        >
          Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {row.firstName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {row.lastName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {row.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                    onClick={() => navigate(`/edit/${row._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-700 focus:outline-none"
                    onClick={() => deleteData(row._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
