import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./about.css";

const About = () => {
  //

  const [userdata, setuserData] = useState();

  const history = useHistory();
  const callabout = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setuserData(data);

      if (!res.status === 201) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      history.push("/");
    }
  };
  useEffect(() => {
    callabout();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1>hello</h1>
      <h1>{userdata.email}</h1>
      <h1>{userdata.username}</h1>
      <h1>{userdata.number}</h1>
      {/* <div className="container m-5">
        <div className="card wds">
          <div className="card-body">
            <h5 className="card-title">userdata.name</h5>
            <p className="card-text">userdata.department</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">userdata.username</li>
            <li className="list-group-item">userdata.email</li>
            <li className="list-group-item">userdata.number</li>
          </ul>
          <div className="card-body"> insert</div>
        </div>
      </div> */}
    </>
  );
};

export default About;
