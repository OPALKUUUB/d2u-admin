import { useState } from "react";

export default function useToken() {
  if (localStorage.getItem("token") === "undefined") {
    localStorage.removeItem("token");
    window.location.reload(false);
  }
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    // console.log(tokenString);
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };
  return {
    setToken: saveToken,
    token,
  };
}
