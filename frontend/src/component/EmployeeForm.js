import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function EmployeeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigator = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/emp/insert", data)
      .then((res) => {
        if (res.status === 200) {
          alert("✅ Employee successfully Added");
          navigator("/display");
        } else Promise.reject();
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

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">Add Employee</button>
        <br />
      </form>
    </>
  );
}

export default EmployeeForm;
