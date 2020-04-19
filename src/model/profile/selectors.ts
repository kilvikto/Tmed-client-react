const doctorBranch = state => state.profile.doctor;
const pacientBranch = state => state.profile.pacient;

/* DOCTOR */
const getDoctorPacients = state => doctorBranch(state).pacients;


/* PACIENT */
const getAllDoctors = state => pacientBranch(state).allDoctors;

const getGenInfo = state => pacientBranch(state).general;
const getClinicInfo = state => pacientBranch(state).clinic;
const getRecords = state =>  pacientBranch(state).records;

export default {
  getDoctorPacients,
  getAllDoctors,
  getGenInfo,
  getClinicInfo,
  getRecords,
};