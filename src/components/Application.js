import React, { useState, useEffect } from "react";

import DayList from "components/DayList";
import "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";
import Appointment from "components/Appointment";

const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
  }

  const schedule = getAppointmentsForDay(state, state.day).map(item => {
    const dailyInterviewers = getInterviewersForDay(state, state.day);
    const interview = getInterview(state, state.appointments[item.id].interview)
    return (
      <Appointment
        key={item.id}
        id={item.id}
        time={item.time}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        interview={interview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])


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
