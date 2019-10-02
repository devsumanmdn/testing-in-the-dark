import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";

function UserProfile({ router }) {
  const userId = router.query && router.query.userId ? router.query.userId : "";

  return <div>{`userId: ${userId}`}</div>;
}

UserProfile.propTypes = {};

export default withRouter(UserProfile);
