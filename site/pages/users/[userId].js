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

  &.selected.occupied {
    background-color: #22f;
    color: #fff;
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
  const authUserId = auth.user && auth.user._id ? auth.user._id : null;
  useEffect(() => {
    axios("/api/users/" + userId).then(({ data }) => {
      setUserData(data);
    });
  }, []);

  const selectSlot = slot => {
    const newSlot = {
      startTime: slot.toDate(),
      endTime: slot.add(1, "h").toDate(),
      userId: authUserId
    };
    axios({
      url: `/api/users/${userId}/slots`,
      method: "post",
      data: { slots: [...(userData.slots || []), newSlot] }
    }).then(() => {
      setUserData({
        ...userData,
        slots: [...(userData.slots || []), newSlot]
      });
    });
  };

  return (
    <div>
      <div>{`userId: ${userId}`}</div>
      <div>
        {new Array(24).fill(null).map((_, index) => {
          const slot = moment.tz(
            index,
            "HH",
            (userData && userData.timeZone) || "Asia/Calcutta"
          );
          const formatted = slot.tz(moment.tz.guess()).format("hh A");
          const selected = !!(
            userData &&
            userData.slots &&
            userData.slots.find(
              ({ startTime, userId }) =>
                new Date(startTime).getTime() === slot.toDate().getTime() &&
                slot.userId === authUserId
            )
          );
          const occupied = !!(
            userData &&
            userData.slots &&
            userData.slots.find(
              ({ startTime }) =>
                new Date(startTime).getTime() === slot.toDate().getTime()
            )
          );
          console.log({ selected, occupied });
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
        {JSON.stringify(userData)}
      </div>
    </div>
  );
}

UserProfile.propTypes = {};

const mapStateToProps = ({ slots, auth }) => ({ slots, auth });

export default withRouter(connect(mapStateToProps)(UserProfile));
