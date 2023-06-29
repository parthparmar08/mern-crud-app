import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigator = useNavigate();

  return (
    <>
      <div className="navbar">
        <p onClick={() => navigator("/index")}>Home</p>
        <p onClick={() => navigator("/add")}>Add Employee</p>
        <p onClick={() => navigator("/display")}>View Employee</p>
        <p onClick={() => navigator("/search")}>Search Employee</p>
        <p onClick={() => (window.sessionStorage.clear(), navigator("/"))}>
          Logout
        </p>
      </div>
      <h2>Hey! Welcome</h2>
    </>
  );
}
export default Home;
