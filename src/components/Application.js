import React from "react";

import DayList from "components/DayList";
import "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const schedule = getAppointmentsForDay(state, state.day).map(currentAppointment => {
    return (
      <Appointment
        key={currentAppointment.id}
        id={currentAppointment.id}
        time={currentAppointment.time}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interview={getInterview(state, currentAppointment.interview)}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={state.days.id}
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        <ul>
          {schedule}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
