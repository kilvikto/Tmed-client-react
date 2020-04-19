import React, { memo } from 'react';
import styled from 'styled-components';


const InfoBlock = styled.section`
  min-height: 30rem;
  min-width: 295px;
  max-height: 35rem;
`;

const InnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 12rem;  
`;

const InfoHeading = styled.h2`
  text-align: center;
`;

const BaseForm = styled.form` 
  display: block;
  min-height: 10rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem;
`;

const BaseLabel = styled.label`
  display: block;
  min-width: 40px;
  position: static;
  font-weight: bold;
`;

const InputContainer = styled.div`
  margin-top: 0.1rem;
  display: grid;
  grid-template-columns: 1fr 0.3fr 0.2fr;
`;


const BaseInput = styled.input`
  padding: 0.2rem;
  outline: none;
  min-width: 100%;
  background: inherit;
  width: 100%;
  border: none;
  border-bottom: 1px solid #173019; 

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 20rem;
  height: 5rem;
  padding-top: 1rem;
`;

const Button = styled.button`
  text-align: center;
  margin: 1rem; 
  padding: 0.5rem 1rem;
`;

interface IRecord {
  user: {
    nameId: string,
    role: string,
  },
  activeRecord: any,
  setActiveRecord: (updRec: any) => void,
  updatePacientRecord: (updateData) => void,
};

const Record: React.FC<IRecord> = memo(({ 
  user,
  activeRecord, 
  setActiveRecord,
  updatePacientRecord,
}) => {

  const onSaveChanges = (e: any) => {
    e.preventDefault();
    updatePacientRecord(activeRecord);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const key = e.target.id;
    let value: string | boolean = e.target.value;

    if (type === "checkbox") value = !activeRecord[key];

    setActiveRecord({
      ...activeRecord,
      [key]: value,
    })
  };


  return (
    <InfoBlock>
      <InnerBlock>
        <InfoHeading>Health inventory</InfoHeading>
        <BaseForm>
          <InputContainer>
            <BaseLabel>Pressure up</BaseLabel>
            <BaseInput 
              type="number" 
              id="pressureUp"
              value={activeRecord.pressureUp}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <BaseLabel>Pressure down</BaseLabel>
            <BaseInput 
              type="number" 
              id="pressureDown"
              value={activeRecord.pressureDown}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <BaseLabel>Pulse</BaseLabel>
            <BaseInput
                type="number" 
                id="pulse"
                value={activeRecord.pulse}
                onChange={handleChange} 
              />
          </InputContainer>
          <InputContainer>
            <BaseLabel>Temperature</BaseLabel>
            <BaseInput
                type="number" 
                id="temperature"
                value={activeRecord.temperature}
                onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <BaseLabel>Blood glucose</BaseLabel>
            <BaseInput
                type="number" 
                id="bloodGlucose"
                value={activeRecord.bloodGlucose}
                onChange={handleChange}
            />
          </InputContainer>
        </BaseForm>
      </InnerBlock>
      <InnerBlock>
        <BaseForm> 
          <InfoHeading>Health complaint</InfoHeading>
          <InputContainer>
            <BaseLabel htmlFor="isHeadache">Headache</BaseLabel>
            <BaseInput
                type="checkbox" 
                id="isHeadache"
                checked={activeRecord.isHeadache}
                value={activeRecord.isHeadache}
                onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <BaseLabel htmlFor="isRheum">Rheum</BaseLabel>
            <BaseInput
                type="checkbox" 
                id="isRheum"
                checked={activeRecord.isRheum}
                value={activeRecord.isRheum}
                onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <BaseLabel htmlFor="isSoreThroat">Sore throat</BaseLabel>
            <BaseInput
                type="checkbox" 
                id="isSoreThroat"
                checked={activeRecord.isSoreThroat}
                value={activeRecord.isSoreThroat}
                onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <BaseLabel htmlFor="isNausea">Nausea</BaseLabel>
            <BaseInput
                type="checkbox" 
                id="isNausea"
                checked={activeRecord.isNausea}
                value={activeRecord.isNausea}
                onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <BaseLabel htmlFor="isIndigestion">Indigestion</BaseLabel>
            <BaseInput
                type="checkbox" 
                id="isIndigestion"
                checked={activeRecord.isIndigestion}
                value={activeRecord.isIndigestion}
                onChange={handleChange}
            />
          </InputContainer>
          </BaseForm>
      </InnerBlock> 
      {user.role === 'pacient' && (
        <ButtonContainer>
          <Button onClick={onSaveChanges}>Save changes</Button>
        </ButtonContainer>
      )}
  </InfoBlock>
  );
});

export default Record;
