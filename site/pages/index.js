import React from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import moment from "moment-timezone";
import { connect } from "react-redux";

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

const index = ({ auth, slots }) => (
  <>
    <Head>
      <script src={"/static/js/main.js"} />
    </Head>
    <main>
      <p>hi {auth.loggedIn ? auth.user.name : "Anonymous"}</p>
      {auth.loggedIn
        ? slots.ownSlots.map(({ startTime, endTime }) => {
            const userTimeZone =
              auth.user && auth.user.timeZone
                ? auth.user.timeZone
                : "Asia/Calcutta";
            const startDate = new Date(startTime);
            const slotmoment = moment(startDate, userTimeZone);
            const formatted = slotmoment.format("hh a");
            return <SlotButton key={formatted}>{formatted}</SlotButton>;
          })
        : null}
    </main>
  </>
);

const mapStateToProps = ({ auth, slots }) => ({ auth, slots });

export default connect(mapStateToProps)(index);
