import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../component/dashboard.css";

const Dashboard = () => {
  // const history = useHistory();
  const [getuserdata, setUserdata] = useState([]);

  //console.log(getuserdata);

  const getdata = async () => {
    const res = await fetch(`/getdata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
      console.log(" data getting ....");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  //delete
  const deleteuser = async (id) => {
    const res2 = await fetch(`deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      alert("User DELETED successfully");
      getdata();
    }
  };

  return (
    <div className="mt-5">
      <div className="  ">
        <div className="add-btn mt-2">
          {/* <button className="btn btn-primary m-3">ADD DATA</button> */}
          <NavLink to="/register" className="btn btn-primary m-3">
            ADD NEW DATA
          </NavLink>
          <table class="table">
            <thead>
              <tr className="table-dark ">
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">email</th>
                <th scope="col">Password</th>
                <th scope="col">Mobile</th>
                <th scope="col">Department</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((elements, id) => {
                return (
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{elements.name}</td>
                    <td>{elements.username}</td>
                    <td>{elements.email}</td>
                    <td>{elements.password}</td>
                    <td>{elements.number}</td>
                    <td>{elements.department}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`update/${elements._id}`}>
                        <button className="btn btn-primary">Update</button>
                      </NavLink>

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteuser(elements._id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
