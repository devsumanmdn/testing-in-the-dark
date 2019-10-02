import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment-timezone";

import { signup as signupAction } from "../redux/auth/authActions";

function Signup({ auth, signup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    signup({
      name,
      email,
      password,
      userName,
      timeZone: moment.tz.guess()
    });
  };

  return (
    <div className={"main-container"}>
      <h3>Signup</h3>
      {auth.signingUpError ? <p>{auth.signingUpError}</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          onChange={({ target }) => setName(target.value)}
          name={"name"}
          placeholder={"Full Name"}
          value={name}
        />
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
        <input
          onChange={({ target }) => setUserName(target.value)}
          name={"userName"}
          placeholder={"Username"}
          value={userName}
        />
        <input
          type={"submit"}
          value={auth.signingUp ? "SigningUp" : "Signup"}
        />
      </form>
    </div>
  );
}

Signup.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  signup: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  signup: signupAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
