import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
const UserSign = () => {
  const history = useHistory();
  const [inputVal, setInputVal] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    number: "",
    department: "",
  });
  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputVal((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const adddata = async (e) => {
    e.preventDefault();

    const { name, username, email, password, number, department } = inputVal;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        number,
        department,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("fill required data");
      console.log("error");
    } else {
      alert("Data Added successfully");
      history.push("/");
      // console.log(data);
    }
  };
  return (
    <>
      <div className="container">
        <NavLink to="/" className="btn btn-primary btn-sm m-3">
          back to LOGIN
        </NavLink>
        <form>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Name</label>
              <input
                name="name"
                value={inputVal.name}
                onChange={setData}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Username</label>
              <input
                name="username"
                value={inputVal.username}
                onChange={setData}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Email address</label>
              <input
                name="email"
                value={inputVal.email}
                onChange={setData}
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Password</label>
              <input
                name="password"
                value={inputVal.password}
                onChange={setData}
                type="password"
                className="form-control"
              />
            </div>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Mobile number</label>
              <input
                name="number"
                value={inputVal.number}
                onChange={setData}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Department</label>
              <input
                name="department"
                value={inputVal.department}
                onChange={setData}
                type="text"
                className="form-control"
              />
            </div>
            <button type="submit" onClick={adddata} className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSign;
