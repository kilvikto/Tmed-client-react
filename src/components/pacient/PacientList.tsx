import React, { memo } from 'react';
import { connect } from 'react-redux';
import { ProfileSelector } from 'model/profile';
import styled from 'styled-components';


const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Heading = styled.h4`
  color: #173019;
`;

const Table = styled.table`
  width: 100%;
  max-height: 30rem;
  text-align: center;
  border-collapse: collapse;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;

const HeadRow = styled.tr`
  background-color: darkgray;
`;

const Row = styled.tr`
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

const Tdata = styled.td`
  border: 1px solid #173019;
`;

const THead = styled.th`
  border: 1px solid #173019;
`;

interface IPacientList {
  pacients?: any,
  fetchPacientProfile: (id: number) => void,
  fetchPacientRecords: (id: number) => void,
  getDoctorPacientHistory: (id: number) => void,
};


const PacientList: React.FC<IPacientList> = memo(({ 
  pacients,
  fetchPacientProfile,
  fetchPacientRecords,
  getDoctorPacientHistory,
}) => {

  const renderTableData = (data) => {
    return data.map(pacient => (
      <Row 
        key={pacient.id} 
        onClick={() => {
          fetchPacientProfile(pacient.id);
          fetchPacientRecords(pacient.id); 
          getDoctorPacientHistory(pacient.id);
        }}>
        <Tdata>{pacient.id}</Tdata>
        <Tdata>{pacient.name}</Tdata>
        <Tdata>{pacient.surname}</Tdata>
        <Tdata>{pacient.email}</Tdata>
      </Row>
    ));
  };
  
  return (
    <Container>
      <Heading>Your pacients</Heading>
      <Table>
        <Thead>
          <HeadRow>
            <THead>ID</THead>
            <THead>Name</THead>
            <THead>Surname</THead>
            <THead>Email</THead>
          </HeadRow> 
        </Thead>
        <Tbody>
          {renderTableData(pacients)}
        </Tbody>
      </Table>
    </Container>
  );
});


const stateToProps = state => ({
  pacients: ProfileSelector.getDoctorPacients(state),
});

export default connect(stateToProps, null)(PacientList);
