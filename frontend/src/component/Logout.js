import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "appllication/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      history.push("/", { replace: true });
      if (!res.status === 201) {
        const error = new Error(res.error);
        throw error;
      }
    });
  });

  return <div>Logout</div>;
};

export default Logout;
