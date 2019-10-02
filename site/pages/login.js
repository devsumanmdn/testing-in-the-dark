import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login as loginAction } from "../redux/auth/authActions";

function Login({ login, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    login({
      email,
      password
    });
  };

  return (
    <div className={"main-container"}>
      <h3>Login</h3>
      {auth.loggingInError ? <p>{auth.loggingInError}</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          onChange={({ target }) => setEmail(target.value)}
          name={"email"}
          placeholder={"Email"}
          value={email}
        />
        <input
          onChange={({ target }) => setPassword(target.value)}
          name={"password"}
          placeholder={"Password"}
          value={password}
        />
        <input type={"submit"} value={auth.logginIn ? "loggingIn" : "Login"} />
      </form>
    </div>
  );
}

Login.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  login: loginAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
