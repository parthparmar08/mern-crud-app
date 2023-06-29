import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function EmployeeEdit() {
  const { state } = useLocation();
  const { data } = state;
  const navigator = useNavigate();

  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      id: data._id,
      name: data.name,
      gender: data.gender,
      age: data.age,
      salary: data.salary,
      dept: data.dept,
      password: data.password,
      role: data.role,
    },
  });

  const handleUpdate = (data) => {
    axios
      .put(`http://localhost:5000/emp/update`, data)
      .then((res) => {
        if (res.status === 200) {
          alert("✅ Employee successfully updated");
          navigator("/display");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
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

      <form onSubmit={handleSubmit(handleUpdate)}>
        <label>
          <input type="hidden" {...register("id")} />
        </label>

        <label>
          Name:
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <span> Name field is required</span>}
        </label>
        <br />
        <br />

        <label>
          Gender:
          <input
            type="radio"
            name="gender"
            value="male"
            {...register("gender", { required: true })}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            {...register("gender", { required: true })}
          />
          Female
          {errors.gender && <span> Gender field is required</span>}
        </label>
        <br />
        <br />

        <label>
          Age:
          <input
            type="number"
            {...register("age", {
              required: "Age field is required",
              min: {
                value: 18,
                message: "Minimum age is 18",
              },
            })}
          />
          {errors.age && <span> {errors.age.message} </span>}
        </label>
        <br />
        <br />

        <label>
          Salary:
          <input type="number" {...register("salary", { required: true })} />
          {errors.salary && <span> Salary field is required</span>}
        </label>
        <br />
        <br />

        <label>
          Department:
          <input
            type="text"
            {...register("dept", {
              required: "Department field is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Department Name Must be Alphabet",
              },
            })}
          />
          {errors.dept && <span> {errors.dept.message}</span>}
        </label>
        <br />
        <br />

        <label>
          Password:
          <input
            type="password"
            {...register("password", {
              required: "Password field is required",
              minLength: {
                value: 6,
                message: "Password Must be 6 Character",
              },
            })}
          />
          {errors.password && <span> {errors.password.message}</span>}
        </label>
        <br />
        <br />

        <label>
          Role:
          <select {...register("role", { required: true })}>
            <option>--Select--</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <span> Role field is required</span>}
        </label>
        <br />
        <br />

        <button type="submit">Update Employee</button>
        <br />
      </form>
    </>
  );
}

export default EmployeeEdit;
