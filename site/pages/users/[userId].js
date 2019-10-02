import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import moment from "moment-timezone";
import styled from "styled-components";

const SlotButton = styled.button`
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 3px;
  padding: 5px;
  margin: 10px;
  transition-duration: 0.3s;
  cursor: pointer;

  &.selected {
    background-color: #22f;
  }

  &.occupied {
    background-color: #aaa;
    cursor: not-allowed;
  }

  :hover {
    background-color: #22f6;
    /* color: #fff; */
  }
`;

function UserProfile({ router, slots, auth }) {
  const [userData, setUserData] = useState(null);
  const userId = router.query && router.query.userId ? router.query.userId : "";
  useEffect(() => {
    axios("/api/users/" + userId).then(({ data }) => {
      setUserData(data);
    });
  }, []);

  const selectSlot = slot => {
    const newSlot = {
      startDate: slot.toDate(),
      endDate: slot.add(1, "h").toDate(),
      userId: auth.loggedIn ? auth.user._id : ""
    };
    axios({
      url: `/api/users/${userId}/slots`,
      method: "post",
      data: { slots: [...userData.slots, newSlot] }
    }).then(() => {
      setUserData({
        ...userData,
        slots: [...userData.slots, newSlot]
      });
    });
  };

  return (
    <div>
      <div>{`userId: ${userId}`}</div>
      <div>
        {new Array(24).fill(null).map((_, index) => {
          const slot = moment(index, "HH");
          const formatted = slot.format("hh A");
          const selected = slots;
          const occupied =
            userData &&
            userData.slots &&
            userData.slots.find(slot => slot.startTime === slot.toDate());
          return (
            <SlotButton
              className={clsx({ occupied, selected })}
              key={formatted}
              onClick={() => selectSlot(slot)}
              disabled={occupied}
            >
              {formatted}
            </SlotButton>
          );
        })}
      </div>
    </div>
  );
}

UserProfile.propTypes = {};

const mapStateToProps = ({ slots, auth }) => ({ slots, auth });

export default withRouter(connect(mapStateToProps)(UserProfile));
