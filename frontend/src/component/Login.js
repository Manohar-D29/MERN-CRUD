import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 422 || !data) {
      alert("Invalid Credentials");
    } else {
      alert(` Welcome user ${email} `);
      history.push("/dashboard");
    }
  };

  return (
    <>
      <form>
        <div className="container border border-primary mt-5 ol-lg-6 col-md-4 col-12 p-4">
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              onClick={loginUser}
              className="btn btn-primary "
            >
              LOGIN
            </button>
            <NavLink to="/signup" className="btn btn-secondary">
              SIGN-UP
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
