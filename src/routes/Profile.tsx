import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ProfileAction } from 'model/profile';
import { Pacient, PacientList } from 'components/pacient';
import CalendarBox from 'components/calendar';
import Diagram from 'components/diagram';

const PACIENT = 'pacient';
const DOCTOR = 'doctor';

const Wrapper = styled.main`
  box-sizing: border-box;
  padding-top: 1.5rem;
  min-height: 100%;
  width: 100%;
`;

interface IProfile {
  history: any,
  user: {
    nameId: string,
    role: string,
  },
  getDoctorsPacientInfo: (id: number) => void,
  getDoctorPacients: () => void,
  getDoctorPacientRecord: (id: number) => void,
  getAllDoctors: () => void,
  getPacientProfile: () => void,
  getDoctorPacientHistory: (id: number) => void,
};

const Profile: React.FC<IProfile> = memo(({
  user,
  getAllDoctors,
  getDoctorsPacientInfo,
  getDoctorPacientRecord,
  getDoctorPacients,
  getPacientProfile,
  getDoctorPacientHistory,
}) => {
  const role = user.role;

  useEffect(() => {
    if (role === DOCTOR) getDoctorPacients();
    else if (role === PACIENT) {
      getAllDoctors();
      getPacientProfile();
    };
  }, []); 

  return (
    <Wrapper>
      {role === DOCTOR && (
        <PacientList 
          fetchPacientProfile={getDoctorsPacientInfo}
          fetchPacientRecords={getDoctorPacientRecord} 
          getDoctorPacientHistory={getDoctorPacientHistory}
        />
      )}
      <Pacient user={user} />    
      <CalendarBox user={user} />
      <Diagram />
    </Wrapper>  
  );
});


const dispatchToProps = (dispatch) => ({
  getDoctorPacientHistory: (id: number) => dispatch(ProfileAction.getDoctorPacientHistory(id)),
  getDoctorsPacientInfo: (id: number) => dispatch(ProfileAction.getDoctorCertainPacient(id)),
  getDoctorPacients: () => dispatch(ProfileAction.getDoctorPacients()),
  getDoctorPacientRecord: (id: number) => dispatch(ProfileAction.fetchDoctorsPacientRecords(id)),
  getAllDoctors: () => dispatch(ProfileAction.getAllDoctors()),
  getPacientProfile: () => dispatch(ProfileAction.getPacientProfile()),
});

export default connect(null, dispatchToProps)(Profile);
