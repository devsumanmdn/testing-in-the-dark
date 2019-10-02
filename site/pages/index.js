import React from "react";
import Link from "next/link";
import Head from "next/head";
import { connect } from "react-redux";

const index = ({ auth }) => (
  <>
    <Head>
      <script src={"/static/js/main.js"} />
    </Head>
    <main>hi {auth.loggedIn ? auth.user.name : "Anonymous"}</main>
  </>
);

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(index);
