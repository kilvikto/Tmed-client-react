import axios from 'axios';


// Doctor profile
export const fetchDoctorPacients = () => { // via Token 
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

// Pacient profile 
export const fetchAllDoctors = () => { // returns array of doctor with id(98275987239847sfjpdfk) s emailem
  return axios.get('/api/alldoctors');
};

export const fetchPacientInfo = () => {
  return axios.get('/api/profile'); // s pomoci auuthTOkena
};

export const updatePacientInfo = (updInf) => {  // для выбора доктора тоже, doctoru prisvou doctorid(ldhsflhdslfh876876)
  return axios.put('/api/profile', updInf); // update doctor by doctorId
};

//history - nuzhno protestit'     

export const fetchPacientDisease = () => { // via token
  return axios.get('/api/history');
};

export const addPacientDisease = (updData: any) => { // via token   MOZHET TOLKO VNOSIT DANNYE ODIN RAZ
  return axios.post('/api/history', updData);
};


//records

export const fetchDoctorsPacientRecord = (id: number) => { // for doctor via pacient Id // negotov ewe
  return axios.get(`/api/records/${id}`);
};

export const fetchPacientRecords = () => { // for pacient via TOKEN
  return axios.get('/api/records');
};

export const postPacientRecord = (newData) => { //  for pacient - via token // post if no data 
  return axios.post('/api/records', newData);
}; 

export const putPacientRecord = (updData) => { // put if data exists on backend
  return axios.put('/api/records', updData);
};

/* propisat*/

// GET I POST , dostat i add only once, update nenuzhno  
// GET PO ID PACIENTA (MOZHET DELAT TOLKO DOCTOR)
// GET PO TOKENU delaet pacient
// POST po tokenu () i sends data in body of request
// '/api/medicationhistory'
// '/api/allergyhistory'
// '/api/vaccinationhistory'

/*Doctor pacient history funcs */
export const fetchDocPacientsMedHistory = (id: number) => {
  return axios.get(`/api/medicationhistory/${id}`)
};

export const fetchDocPacientAllergy = (id: number) => {
  return axios.get(`/api/allergyhistory/${id}`);
};

export const fetchDocPacientVaccination = (id: number) => {
  return axios.get(`/api/vaccinationhistory/${id}`);
};


/* Medications */ 
export const fetchMedicationHistory = () => {
  return axios.get('/api/medicationhistory');
};

export const addMedicationHistory = (updData: any) => {
  return axios.post('/api/medicationhistory', updData);
  // { text: "medication" } 
};

/*Allergy*/
export const fetchAllergyHistory = () => {
  return axios.get('/api/allergyhistory');
};

export const addAllergyHistory = (updData: any) => {
  return axios.post('/api/allergyhistory', updData);
};

/*Vaccinations*/ 
export const fetchVaccinationHistory = () => {
  return axios.get('/api/vaccinationhistory');
};  

export const addVaccinationHistory = (updData: any) => {
  return axios.post('/api/vaccinationhistory', updData);
};