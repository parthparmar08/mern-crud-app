import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigator = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/emp/login", data)
      .then((res) => {
        if (res.status === 200) {
          alert("✅ Successfully Logged In");
          window.sessionStorage.setItem("token", res.data.token);
          navigator("/index");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert("Please Check Credentials!!!"));
    reset();
  };

  return (
    <>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <center>
            <h1>Log In</h1>
          </center>
          <label>
            <p>
              Username{" "}
              <input type="text" {...register("name", { required: true })} />
              {errors.name && <span> Please Enter a User Name</span>}
            </p>
          </label>
          <label>
            <p>
              Password{" "}
              <input
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && <span> Please Enter a Password</span>}
            </p>
          </label>
          <div>
            <center>
              <button type="submit">LOGIN</button>
            </center>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
