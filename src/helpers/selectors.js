export const getInterview = (state, interview) => {
  if (interview) {
    const i = interview.interviewer;
    const setInterviewer = state.interviewers[i];
    return {
      "student" : interview.student,
      "interviewer" : setInterviewer
    };
  }
  return null;
};

export const getAppointmentsForDay = (state, day) => {
  const daySet = state.days.find(currentDay => currentDay.name === day);
  if (!daySet || state.days.length === 0) {
    return [];
  }
  const dayAppointments = daySet.appointments.map(id => state.appointments[id]);
  
  return dayAppointments;
}

export const getInterviewersForDay = (state, day) => {
  const daySet = state.days.find(currentDay => currentDay.name === day);
  if (!daySet) {
    return [];
  }
  const dayInterviewers = daySet.interviewers.map(id => state.interviewers[id]);
  
  return dayInterviewers;
}