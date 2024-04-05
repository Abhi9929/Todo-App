/* eslint-disable react/prop-types */
import React from "react";
import "../profile.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AccountInfo = ({ firstName, token }) => {
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const firstLetter = firstName.charAt(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = axios.post(
        "/api/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log((await response).data);
      navigate('/', {replace: true})
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="message-box">
        <div className="user-name">
          <h2>Hello {firstName}!</h2>
          <p>Lets be productive today.</p>
        </div>
        <div className="flex gap-6 items-center">
          <div className="userAcc">{firstLetter}</div>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded shadow"
          >
            Logout
          </button>
        </div>
      </div>
      <h1 className=" text-5xl font-semibold">Taskmaster</h1>
    </>
  );
};

export default AccountInfo;
