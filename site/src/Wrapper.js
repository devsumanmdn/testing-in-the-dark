import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import Link from "next/link";

function Wrapper({ children, auth }) {
  useEffect(() => {
    Router.push("/");
  }, [auth.loggedIn]);

  return (
    <div>
      <nav>
        <li>
          <Link href={"/"}>
            <a>Home</a>
          </Link>
        </li>
        {!auth.loggedIn ? (
          <>
            <li>
              <Link href={"/login"}>
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href={"/signup"}>
                <a>Signup</a>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/"}>
              <a>Logout</a>
            </Link>
          </li>
        )}
      </nav>
      {children}
    </div>
  );
}

Wrapper.propTypes = {};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Wrapper);
