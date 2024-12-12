
import React, { useEffect, useState } from "react";
import axios from 'axios'

import { useNavigate } from 'react-router-dom'; 

let baseUrl = 'http://localhost:3001/api/users'

// console.info('aasdfassssssssdfasf')
function LoginPage (props) {
  const [formData, setFormData] = useState({ email: ""});
  const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();

    useEffect(() => {
        console.info(';asdfsadfsdfdf')
    },[])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.info('sadfasdfasfd', formData)
    e.preventDefault();
    if (!formData.email) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    setErrorMessage("");
    axios.get(`${baseUrl}/Login/${formData.email}`).then(res => {
        console.info('resresresresresres', res)
        window.sessionStorage.setItem("contractor", res.data.data[0].id);
        navigate("/dashboard");
    }).catch(error => console.error('errorerrorerrorerrorerror', error))

  };

  return (
    <div >
      <h1>Login</h1>
      <form onSubmit={handleSubmit} tyle={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
       
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
