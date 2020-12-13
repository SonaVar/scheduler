import { useEffect, useState } from 'react';

const axios = require('axios');


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  //Function to set spots
  function setSpots(id) {
    const dayObject = state.days.find(element => element.appointments.includes(id));
    const dayId = dayObject.id - 1;
    const spots = state.appointments[id].interview === null ? dayObject.spots - 1 : dayObject.spots + 1;
    const dayItem = {
      ...state.days[dayId],
      spots: spots
    }
    let daysArray = [
      ...state.days,
    ]
    daysArray[dayId] = dayItem;

    return daysArray;
  }

  //Function to book an appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview: interview})
    .then (() => {
      if (state.appointments[id].interview === null) {
        const days = [...setSpots(id)];
        setState({...state, appointments, days})
      } else {
        setState({...state, appointments})
      }
    })
  };

  //Function to delete an appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then (() => {
        const days = [...setSpots(id)];
        setState({...state, appointments, days})
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  return { state, setDay, bookInterview, cancelInterview };
}