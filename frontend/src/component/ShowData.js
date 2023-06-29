import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowData() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/emp/display")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log("render...");
  }, []);

  const editEmployee = (id) => {
    axios
      .get("http://localhost:5000/emp/displaybyid",{ params: { id } })
      .then((res) => {
        if (res.status === 200) {
          //console.log(res.data);

          navigator("/edit", { state: { data: res.data } });
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const deleteEmployee = (id) => {
    axios
      .delete("http://localhost:5000/emp/delete",{ params: { id } })
      .then((res) => {
        if (res.status === 200) {
          alert("🚩Employee successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const searchEmp = () => {
    const emp = {
      name: name,
    };
    //console.log(emp);

    axios
      .post("http://localhost:5000/emp/displaybyname", emp)
      .then((res) => {
        if (res.status === 200 && res.data.length !== 0) {
          alert("✅ Employee Data Found");
          setEmployees(res.data);
          console.log(res.data);
        } else {
          alert("Sorry,Employee Data Not Found");
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
    setName("");
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

      <div>
        <table>
          <tbody>
            <tr>
              <th colSpan="7">
                <h3>Employee List</h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a Name"
                />{" "}
                <button onClick={() => searchEmp()}>Search</button>
              </th>
            </tr>
            <tr style={{ color: "red" }}>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            {employees.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.gender}</td>
                <td>{data.age}</td>
                <td>{data.salary}</td>
                <td>{data.dept}</td>
                <td>{data.role}</td>
                <td>
                  <button onClick={() => editEmployee(data._id)}>Edit</button>
                  <button onClick={() => deleteEmployee(data._id)}>X</button>
                </td>
              </tr>
            ))}
            {/* {employees
              .filter(
                (row) =>
                  !searchedVal.length ||
                  row.name
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((data) => (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.gender}</td>
                  <td>{data.age}</td>
                  <td>{data.salary}</td>
                  <td>{data.dept}</td>
                  <td>{data.role}</td>
                  <td>
                    <button onClick={() => editEmployee(data._id)}>Edit</button>
                    <button onClick={() => deleteEmployee(data._id)}>X</button>
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowData;
