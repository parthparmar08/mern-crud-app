import React from "react";
import EmployeeForm from "./component/EmployeeForm";
import ShowData from "./component/ShowData";
import EmployeeEdit from "./component/EmployeeEdit";
import LoginForm from "./component/LoginForm";
import Protected from "./component/Protected";
import Home from "./component/Home";
import SearchForm from "./component/SearchForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/index"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/add"
            element={
              <Protected>
                <EmployeeForm />
              </Protected>
            }
          />
          <Route
            path="/display"
            element={
              <Protected>
                <ShowData />
              </Protected>
            }
          />
          <Route
            path="/edit"
            element={
              <Protected>
                <EmployeeEdit />
              </Protected>
            }
          />

          <Route
            path="/search"
            element={
              <Protected>
                <SearchForm />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;





