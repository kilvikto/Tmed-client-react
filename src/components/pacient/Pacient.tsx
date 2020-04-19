import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { ProfileSelector, ProfileAction } from 'model/profile';
import { connect } from 'react-redux';

import { 
  Wrapper, 
  Container,  
  AuthForm,
  Heading,
  InputBlock,
  Input,
  Label,
  ButtonContainer,
  Button
} from 'routes/Auth';


const BaseContainer = styled(Container)`
  height: 100%;
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr;
  justify-items: stretch;
  /* border-bottom: 1px solid black; */
`;

const GenInfoUI = styled.div`
`;

const ClinicalInfoUI = styled.div`
`;

/* spec info area */
const SpecInfoUI = styled.div`
`;

const AreaBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const InfoArea = styled.textarea`
  margin-top: 0.5rem;
  resize: none;
`;

const SelectBlock = styled.div`
`;

const BaseSelect = styled.select`
  margin-left: 25%;
`;
const BaseOption = styled.option``;
/* end area */

/*form area */
const BaseForm = styled(AuthForm)` 
  display: block;
  min-height: 20rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem;
`;

const InputContainer = styled(InputBlock)`
  margin-top: 0.1rem;
  display: grid;
  grid-template-columns: 0.4fr 0.5fr;
`;

const BaseInput = styled(Input)`
  padding: 0.2rem;
  outline: none;
  min-width: 100%;
  background: inherit;
  width: 100%;
  border-bottom: 1px solid #173019; 

  &:focus {
    outline: none;
  }
`;

const ClinicName = styled.h4`
  color: black;
  font-size: 1rem;
  font-style: italic;
`;

const BaseLabel = styled(Label)`
  display: block;
  min-width: 40px;
  position: static;
  font-weight: bold;
`;

const ClinicTextBlock = styled.p`
  padding: 5px;
`;

const InnerBlock = styled.div`
  text-align: center;
`;

const ContentTitle = styled(Heading)`
  text-align: center;
  font-size: 1.5rem;
`;
/* end area */

interface IPacient {
  general?: any,
  clinic?: any,
  allDoctors?: any,
  user: {
    nameId: string,
    role: string,
  },
  getProfileInfo: () => void,
  getClinicInfo: () => void,
  updatePacientProfile: (updGeneral: any, updHistory: any) => void,
};

const Pacient: React.FC<IPacient> = memo(({
  user,
  general,
  clinic,
  allDoctors,
  getProfileInfo,
  getClinicInfo,
  updatePacientProfile,
}) => {

  const [generalState, setGeneral] = useState({
    name: general.name,
    surname: general.surname,
    birthday: general.birthday,
    gender: general.gender,
    email: general.email,
    telefon_num: general.telefon_num,
    country: general.country,
    city: general.city,
    street: general.street,
    house_num: general.house_num,
    height: general.height,
    weight: general.weight,
    note: general.note,
    doctorId: general.doctorId || '',
    doctorEmail: general.doctorEmail || '', 
  });

  const [clinicState, setClinics] = useState({
    diseases: { name: "" },
    medications: { name: "" },
    vaccinations: { name: "" },
    allergies: { name: "" },
  });

  useEffect(() => {
    if (user.role === 'pacient') {
      getProfileInfo();
      getClinicInfo();
    };
  }, []);

  useEffect(() => {
    setGeneral({
      name: general.name || '',
      surname: general.surname || '',
      birthday: general.birthday || '',
      gender: general.gender || '',
      email: general.email || '',
      telefon_num: general.telefon_num || '',
      country: general.country || '',
      city: general.city || '',
      street: general.street || '',
      house_num: general.house_num || '',
      height: general.height || '',
      weight: general.weight || '',
      note: general.note || '',
      doctorId: general.doctorId || '',
      doctorEmail: general.doctorEmail || '',
    });     
  }, [general])


  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    
    setGeneral({
      ...generalState,
      [key]: value
    });
  };

  const handleClinicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id; 
    const value = e.target.value;

    setClinics({
      ...clinicState,
      [key]: {
        name: value
      },
    });
  };

  const mapInputs = (data) => {
    return Object.keys(data).map((key: string) => {
      const value = data[key];
      if (key === 'note' || key === 'doctorId' || key === 'doctorEmail') return null;
      if (key === 'telefon_num') key = 'tel number';
      if (key === 'house_num') key = 'house number'; 
      return (
        <InputContainer key={key}>
          <BaseLabel htmlFor={key}>{key}:</BaseLabel>
          <BaseInput
            type={key === "email" ? key : "text"} 
            id={key}
            value={value === null ? '' : String(value)}
            onChange={handleGeneralChange}
            disabled={user.role === 'doctor'}
          >
          </BaseInput>
        </InputContainer>
      )    
    });
  };


  const handleSelectOption = (e: any) => {
    const value = e.target.value;
    setGeneral({
      ...generalState,
      doctorId: value,
    });
  }

  const renderDoctorSelect = () => {
    return (
      <SelectBlock>
        <h4 style={{ textAlign: 'center'}}>Choose a doctor</h4>
        {allDoctors.length > 0 && (
          <BaseSelect 
            id="doctorId" 
            onChange={handleSelectOption}
          >
            {allDoctors.map(doc => (
              <BaseOption 
                key={doc.id} 
                value={doc.id}
              >
                {doc.email}
              </BaseOption>
            ))}
          </BaseSelect>
        )}
      </SelectBlock>
    );
  };

  const specialInfoHandler = (e: any) => {
    setGeneral({
      ...generalState,
      note: e.target.value, 
    })
  }

  return (
    <Wrapper>
      <BaseContainer>
        <GenInfoUI>
          <ContentTitle>General Information</ContentTitle>
          <BaseForm>
            {mapInputs(generalState)}
          </BaseForm>
        </GenInfoUI>
        <ClinicalInfoUI>
          <ContentTitle>Clinical history</ContentTitle>
          <BaseForm>
            <InputContainer key="diseases">
              {user.role === 'pacient' && (
                <>
                  <BaseLabel htmlFor="diseases">Add disease</BaseLabel>
                  <BaseInput
                    type="text" 
                    id="diseases"
                    value={clinicState.diseases.name}
                    onChange={handleClinicsChange}
                  />
                </>
              )}
              <ClinicName>Diseases:</ClinicName>
              <ClinicTextBlock>{clinic.diseases.length > 0 && clinic.diseases.map(({ id, name }) => 
                <span key={id}>{ name === null ? "" : `${name}, ` }</span>)}
              </ClinicTextBlock>  
            </InputContainer>
            <InputContainer key="medications">
              {user.role === 'pacient' && (
                <>
                  <BaseLabel htmlFor="medications">Add medication</BaseLabel>
                  <BaseInput
                    type="text" 
                    id="medications"
                    value={clinicState.medications.name}
                    onChange={handleClinicsChange}
                  />
                </>
              )}
              <ClinicName>Medications</ClinicName>
              <ClinicTextBlock>{clinic.medications.length > 0 && clinic.medications.map(({ name, id }) => 
                <span key={id}>{ name === null ? "" : `${name}, ` }</span>)}
              </ClinicTextBlock>
            </InputContainer>
            <InputContainer key="allergies">
              {user.role === 'pacient' && (
                <>
                  <BaseLabel htmlFor="allergies">Add allergy</BaseLabel>
                  <BaseInput
                    type="text" 
                    id="allergies"
                    value={clinicState.allergies.name}
                    onChange={handleClinicsChange}
                  />
                </>
              )}
              <ClinicName>Allergies:</ClinicName>
              <ClinicTextBlock>{clinic.allergies.length > 0 && clinic.allergies.map(({ name, id }) => 
                <span key={id}>{ name === null ? "" : `${name}, ` }</span>)}
              </ClinicTextBlock>
            </InputContainer>
            <InputContainer key="vaccinations">
              {user.role === 'pacient' && (
                <>
                  <BaseLabel htmlFor="vaccinations">Add vaccination</BaseLabel>
                  <BaseInput
                    type="text" 
                    id="vaccinations"
                    value={clinicState.vaccinations.name}
                    onChange={handleClinicsChange}
                  />
                </>
              )}
              <ClinicName>Vaccinations:</ClinicName>
              <ClinicTextBlock>{clinic.vaccinations.length > 0 && clinic.vaccinations.map(({ name, id }) => 
                <span key={id}>{ name === null ? "" : `${name}, ` }</span>)}
              </ClinicTextBlock>
            </InputContainer>
          </BaseForm>
        </ClinicalInfoUI>
        <SpecInfoUI>
          <ContentTitle>Special Information</ContentTitle>
          <AreaBlock>
            <InfoArea
              rows={10}
              cols={30}
              value={generalState.note}
              onChange={specialInfoHandler}
            />
          </AreaBlock>
          {user.role === 'pacient' && renderDoctorSelect()}
          {user.role === 'pacient' && generalState.doctorEmail && (
            <InnerBlock>
              <h4>Your doctor</h4>
              <p>{generalState.doctorEmail}</p>
            </InnerBlock>
          )}
          {user.role === 'pacient' && (
            <ButtonContainer style={{ width: '100%' }}>
              <Button 
                type="submit" 
                value="Save changes"  
                onClick={() => updatePacientProfile(generalState, clinicState)} 
              />
            </ButtonContainer>
          )}
        </SpecInfoUI>
      </BaseContainer>
    </Wrapper>
  );
});


const stateToProps = (state) => ({ 
  general: ProfileSelector.getGenInfo(state),
  clinic: ProfileSelector.getClinicInfo(state),
  allDoctors: ProfileSelector.getAllDoctors(state),
});

const dispatchToProps = dispatch => ({
  updatePacientProfile: (updGeneral, updHistory) => {
    dispatch(ProfileAction.updatePacientProfile(updGeneral));
    dispatch(ProfileAction.updatePacientHistory(updHistory));
  },
  getProfileInfo: () => dispatch(ProfileAction.getPacientProfile()),
  getClinicInfo: () => dispatch(ProfileAction.getPacientHistory()),
});

export default connect(stateToProps, dispatchToProps)(Pacient);
