import React, { useState, useEffect } from "react";

import DayList from "components/DayList";
import "components/Appointment"

import "components/Application.scss";
import Appointment from "components/Appointment";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: "Antony Palmer",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Mercy Linguini",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
  },
  {
    id: 6,
    time: "4pm",
    interview: {
      student: "Gloria McMuffin",
      interviewer: {
        id: 2,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: "last",
    time: "5pm"
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDate] = useState("Monday");
  const schedule = appointments.map(item => {
    return (
      <Appointment
        key={item.id}
        {...item}
      />
    );
  });

  useEffect(() => {
    const url = '/api/days'
    axios.get(url).then(response => {
      console.log(response)
      setDays([...response.data])
    })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          key={days.id}
          days={days}
          day={day}
          setDay={setDate}
        />
      </nav>
      <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        <ul>
          {schedule}
        </ul>
      </section>
    </main>
  );
}
