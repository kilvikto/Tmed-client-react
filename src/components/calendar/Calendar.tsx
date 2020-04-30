import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Record from './Record';
import { setValidDateFormat } from 'utils/date';
import { ProfileAction, ProfileSelector } from 'model/profile';


const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
	width: 90%;
  padding: 1.2rem;
  box-sizing: border-box;
  border-top: 1px solid black;
  color: #173019;
`;

const Container = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-start;
  height: 100%;
`;

const CalendarBlock = styled.section`
	padding-left: 7%;
  height: 30rem;
  width: 25rem;
`;

const Heading = styled.h2`
  text-align: center;
`;

const PinnedIcon = styled.img`
  margin-left: 2px;
  width: 12px;
  height: 12px;
`;

const recordState = {
  id: '', 
  pacientId: '',
  timeOfReceipt: '',
  bloodGlucose: 0,
  pressureUp: 0,
  pressureDown: 0,
  pulse: 0,
  temperature: 0,
  isIndigestion: false,
  isRheum: false,
  isSoreThroat: false,
  isNausea: false,
  isHeadache: false,
};

interface ICalendar {
  user: {
    nameId: string,
    role: string,
  },
  records: any,
  getPacientRecords: () => void,
  updateRecord: (updateData: any) => void,
};

const CalendarBox: React.FC<ICalendar> = memo(({ 
  user,
  records,
  getPacientRecords,
  updateRecord,
}) => {

  const [activeRecord, setActiveRecord] = useState({
    ...recordState,
  }); 

  useEffect(() => {
    if (user.role === 'pacient') getPacientRecords();
  }, [user.role, getPacientRecords]);


  const toggleActiveRecord = (e: any) => {
    const newActiveRecord = records.find(record => 
      setValidDateFormat(record.timeOfReceipt) === setValidDateFormat(e)
    );
  
    if (!newActiveRecord) {
      const newRec = recordState;
      newRec.timeOfReceipt = setValidDateFormat(e);
      return setActiveRecord(newRec);
    };

    setActiveRecord(newActiveRecord);
  };


  return (
    <Wrapper>
      <Container>
        <CalendarBlock>
          <Heading>Patient calendar</Heading>    
					<Calendar
            onClickDay={toggleActiveRecord}
            tileContent={(e) => { 
              const pinnedRecord = records.find(rec => 
                setValidDateFormat(rec.timeOfReceipt) === setValidDateFormat(e.date)
              );
              return pinnedRecord ? <PinnedIcon src="/tack.svg" /> : "";
            }}
          />
        </CalendarBlock>
        <Record
          user={user} 
          updatePacientRecord={updateRecord}
          setActiveRecord={setActiveRecord}
          activeRecord={activeRecord} 
        />
      </Container>
    </Wrapper>
  );
});

CalendarBox.defaultProps = {
  records: []
};

const stateToProps = state => ({
  records: ProfileSelector.getRecords(state),
});

const dispatchToProps = dispatch => ({
  getPacientRecords: () => dispatch(ProfileAction.fetchPacientRecords()), 
  updateRecord: (updateData: any) => dispatch(ProfileAction.updatePacientRecord(updateData)),
});

export default connect(stateToProps, dispatchToProps)(CalendarBox);
