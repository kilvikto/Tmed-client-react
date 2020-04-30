import axios from 'axios';

export const fetchDoctorPacients = () => { 
  return axios.get('/api/doctor'); 
};

export const fetchCertainDoctorPacient = (id: number) => {
  return axios.get(`/api/profile/${id}`);
};

export const fetchDoctorPacientDisease = (id: number) => { 
  return axios.get(`/api/history/${id}`)
};

export const fetchDoctorPacientMedication = (id: number) => {
  return axios.get(`/api/medicationhistory/${id}`);
};

export const fetchDoctorPacientAllergy = (id: number) => {
  return axios.get(`/api/allergyhistory/${id}`)
};

export const fetchDoctorPacientVaccination = (id: number) => {
  return axios.get(`/api/vaccinationhistory/${id}`);
};

export const fetchAllDoctors = () => { 
  return axios.get('/api/alldoctors');
};

export const fetchPacientInfo = () => {
  return axios.get('/api/profile'); 
};

export const updatePacientInfo = (updInf) => {  
  return axios.put('/api/profile', updInf);
};
   

export const fetchPacientDisease = () => { 
  return axios.get('/api/history');
};

export const addPacientDisease = (updData: any) => { 
  return axios.post('/api/history', updData);
};


export const fetchDoctorsPacientRecord = (id: number) => { 
  return axios.get(`/api/records/${id}`);
};

export const fetchPacientRecords = () => { 
  return axios.get('/api/records');
};

export const postPacientRecord = (newData) => { 
  return axios.post('/api/records', newData);
}; 

export const putPacientRecord = (updData) => { 
  return axios.put('/api/records', updData);
};

export const fetchDocPacientsMedHistory = (id: number) => {
  return axios.get(`/api/medicationhistory/${id}`)
};

export const fetchDocPacientAllergy = (id: number) => {
  return axios.get(`/api/allergyhistory/${id}`);
};

export const fetchDocPacientVaccination = (id: number) => {
  return axios.get(`/api/vaccinationhistory/${id}`);
};

export const fetchMedicationHistory = () => {
  return axios.get('/api/medicationhistory');
};

export const addMedicationHistory = (updData: any) => {
  return axios.post('/api/medicationhistory', updData);
};

export const fetchAllergyHistory = () => {
  return axios.get('/api/allergyhistory');
};

export const addAllergyHistory = (updData: any) => {
  return axios.post('/api/allergyhistory', updData);
};

export const fetchVaccinationHistory = () => {
  return axios.get('/api/vaccinationhistory');
};  

export const addVaccinationHistory = (updData: any) => {
  return axios.post('/api/vaccinationhistory', updData);
};