import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";

const Update = () => {
  const history = useHistory("");

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
    setInputVal((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setInputVal(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    const { name, username, email, password, number, department } = inputVal;

    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data required data");
      console.log("no");
    } else {
      alert(" Data updated successfully");
      //   history.push("/dashbord");
      history.push("/dashboard");
    }
  };
  return (
    <>
      <div className="container">
        <NavLink to="/">GOTO</NavLink>
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
            <button
              type="submit"
              onClick={updateUser}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
