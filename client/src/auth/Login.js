import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 350px;
  border-radius: 20px;
`;

async function loginUser(credentials) {
  return fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .catch((err) => console.log(err))
    .finally(() => console.log("fetch done!"));
}

export default function Login({ setToken }) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const token = await loginUser(login);
    setToken(token);
  };
  return (
    <Layout>
      <Container>
        <form onSubmit={handleSignIn}>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
      </Container>
    </Layout>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
