import { 
  fetchDoctorPacients,
  fetchDoctorsPacientRecord,
  fetchAllDoctors, 
  fetchPacientInfo,
  fetchPacientRecords,
  fetchCertainDoctorPacient, 
  updatePacientInfo,
  postPacientRecord,
  putPacientRecord,
  fetchMedicationHistory,
  addMedicationHistory,
  fetchAllergyHistory,
  addAllergyHistory,
  fetchVaccinationHistory,
  addVaccinationHistory,
  fetchPacientDisease,
  addPacientDisease,
  fetchDoctorPacientAllergy,
  fetchDoctorPacientDisease,
  fetchDoctorPacientMedication,
  fetchDoctorPacientVaccination,
} from './api';


const DOCTOR_PACIENTS_LOADED = "@@profile/GOT_DOCTOR_PACIENTS_INFO";
const PACIENT_LOADED = "@@profile/GOT_PACIENT_INFO";
const ALL_DOCTORS_LOADED = "@@profile/ALL_DOCTORS_LOADED";
const RECORDS_LOADED = "@@profile/RECORDS_LOADED";
const CLINIC_HIS_LOADED = "@@profile/PACIENT_CLINIC_HISTORY";

export const ProfileAction = {
  getDoctorPacients: () => dispatch => {
    return fetchDoctorPacients()
      .then(({ data }) => {
        console.log(DOCTOR_PACIENTS_LOADED, data);
        dispatch(doctorPacientsLoaded(data)) 
      })
      .catch(err => {
        console.error(err);
        console.log("You Doctor, dont have pacients");
      });
  },
  getDoctorCertainPacient: (id: number) => dispatch => {
    return fetchCertainDoctorPacient(id)
      .then(({ data }) => {
        console.log(PACIENT_LOADED, data);
        dispatch(pacientLoaded(data));
      })
      .catch(err => console.error(err));
  },
  getAllDoctors: () => dispatch => {
    return fetchAllDoctors()
      .then(({ data }) => {
        console.log(ALL_DOCTORS_LOADED, data);
        dispatch(allDoctorsLoaded(data))
      })
      .catch(err => console.error(err));
  },
  getDoctorPacientHistory: (id: number) => async (dispatch) => {
    try {
      const { data: diseases } = await fetchDoctorPacientDisease(id);
      const { data: allergies } = await fetchDoctorPacientAllergy(id);
      const { data: vaccinations} = await fetchDoctorPacientVaccination(id);
      const { data: medications } = await fetchDoctorPacientMedication(id);
        console.log('lalal', { diseases, allergies, vaccinations, medications})
      dispatch(clinicsLoaded({ 
        medications,
        allergies,
        vaccinations,
        diseases,
      }));
    } catch (error) {
      console.error('error while fetchnin doctors pacient history');
    }
  },
  getPacientProfile: () => dispatch => {
    return fetchPacientInfo()
      .then(({ data }) => {
        dispatch(pacientLoaded(data));
      })
      .catch(err => {
        console.error(err, 'getPacientProfile');
      });
  },
  updatePacientProfile: (updateData: any) => dispatch => {
    console.log('pacient Profile gen', updateData);
    return updatePacientInfo(updateData)
      .then((res) => {
        if (res.status === 200) {
          console.log('SUCCESFULLY UPDATED', res);
        }
      })
      .catch(err => {
        console.error('err while UPDATING PACIENT PROFILE')
      });
  },
  fetchDoctorsPacientRecords: (id: number) => dispatch => {
    return fetchDoctorsPacientRecord(id)
      .then(({ data }) => {
        dispatch(recordsLoaded(data));
      })
      .catch(err => {
        console.error('error while fetching doctors pacient record')
      });
  },
  fetchPacientRecords: () => dispatch => {
    return fetchPacientRecords()
      .then(({ data }) => {

        dispatch(recordsLoaded(data));
      })
      .catch(err => {
        console.error('error while fetching pacient records');
      });
  },
  updatePacientRecord: (updateData: any) => async (dispatch) => {
      await postPacientRecord(updateData)
      .then(res => {
        console.log('data',res.data);
        console.log('Record updated succesfully', res.status);
      }).catch(err => console.error(err));

      await putPacientRecord(updateData)
      .then(res => {
        console.log('Record updated succesfully', res.status);
      }).catch(err => console.error(err));
  },
  getPacientHistory: () => async (dispatch) => {
    try {
      const medications = await fetchMedicationHistory();
      const allergies = await fetchAllergyHistory();
      const vaccinations = await fetchVaccinationHistory();
      const diseases = await fetchPacientDisease();

      dispatch(clinicsLoaded({ 
        medications: medications.data,
        allergies: allergies.data,
        vaccinations: vaccinations.data,
        diseases: diseases.data,
      }));
    } catch (error) {
      console.error('ERROR WHILE HISTORY');
    }
  },
  updatePacientHistory: ({ 
    diseases,
    medications, 
    allergies, 
    vaccinations
  }) => (dispatch) => {

    if (diseases.name) 
    addPacientDisease({ name: diseases.name })
    .then(res => console.log('disease added', res.status))
    .catch(err => console.error(err)); 
    
    if (medications.name)
    addMedicationHistory({ name: medications.name })
    .then(res => console.log('Medication added', res.status))
    .catch(err => console.error(err));
    
    if (allergies.name)
    addAllergyHistory({ name: allergies.name })
    .then(res => console.log('allergy added', res.status))
    .catch(err => console.error(err));

    if (vaccinations.name)
    addVaccinationHistory({ name: vaccinations.name })
    .then(res => console.log('vaccination added', res.status))
    .catch(err => console.error(err));
  },
};


const doctorPacientsLoaded = (payload) => ({
  type: DOCTOR_PACIENTS_LOADED,   
  payload
});

const allDoctorsLoaded = (payload) => ({
  type: ALL_DOCTORS_LOADED,
  payload
});

const pacientLoaded = (payload) => ({
  type: PACIENT_LOADED,
  payload
}); 

const recordsLoaded = (payload) => ({
  type: RECORDS_LOADED,
  payload
});

// const updateRecord = (payload) => ({

// });

const clinicsLoaded = (payload) => ({
  type: CLINIC_HIS_LOADED,
  payload,
});


const generalData = {
  name: '',
  surname: '',
  birthday: '',
  gender: '',
  email: '',
  telefon_num: '',
  country: '',
  city: '',
  street: '',
  house_num: '',
  height: '',
  weight: '',
  note: '',
  doctorId: '',
  doctorEmail: '',
};


const initialState = {
  doctor: {
    pacients: []   
  },
  pacient: {
    allDoctors: [],
    general: generalData,
    clinic: {
      medications: [],
      allergies: [],
      vaccinations: [],
      diseases: [],
    },
    records: [], 
  },
};


const ACTION_HANDLERS = {
  [DOCTOR_PACIENTS_LOADED]: (state, { payload }) => ({
    ...state,
    doctor: {
      pacients: payload
    }
  }),
  [ALL_DOCTORS_LOADED]: (state, { payload }) => ({
    ...state,
    pacient: {
      ...state.pacient,
      allDoctors: payload
    }
  }),
  [PACIENT_LOADED]: (state, { payload }) => ({
    ...state,
    pacient: {
      ...state.pacient,
      general: payload,
    }
  }),
  [RECORDS_LOADED]: (state, { payload }) => ({
    ...state,
    pacient: {
      ...state.pacient,
      records: payload,
    }
  }),
  [CLINIC_HIS_LOADED]: (state, { payload }) => ({
    ...state,
    pacient: {
      ...state.pacient,
      clinic: payload,
    }
  }),  
};


export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};