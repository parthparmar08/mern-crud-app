import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [dept, setDept] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  const searchEmp = () => {
    const dep = {
      dept: dept,
    };

    axios
      .post("http://localhost:5000/emp/agg1", dep)
      .then((res) => {
        if (res.status === 200 && res.data.length !== 0) {
          alert("✅ Employee Data Found");
          setEmployees(res.data);
        } else {
          alert("Sorry,Employee Data Not Found");
          setEmployees([]);
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
    setDept("");
  };

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
      <br />

      <div>
        <label>
          <input
            type="text"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            placeholder="Enter a Department"
          />
        </label>{" "}
        <button onClick={() => searchEmp()}>Search</button>
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <th colSpan="7">
                <h3>Employee List</h3>
              </th>
            </tr>
            <tr style={{ color: "red" }}>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Role</th>
            </tr>
            {employees.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.gender}</td>
                <td>{data.age}</td>
                <td>{data.salary}</td>
                <td>{data.dept}</td>
                <td>{data.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SearchForm;
