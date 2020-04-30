import React, { memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ProfileSelector } from 'model/profile'; 
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from 'moment';


const Container = styled.div`
	display: flex;
	justify-content: flex-start;
  height: 100%;
  width: 90%;
  border-top: 1px solid black;
  padding: 1.2rem;
`;
const InnerContainer = styled.div`
`;

const Heading = styled.h2`
  margin: 0 0 1rem 1rem;
  padding: 0;
  text-align: center;
`;

interface IDiagram {
  records: any,
};

const Diagram: React.FC<IDiagram> = memo(({
  records,
}) => {
  

  const transformDataForDiagram = (data) => {
    const sortedByDate = data.sort(function(a, b) {
      const date: any = new Date(b.timeOfReceipt);
      const date1: any = new Date(a.timeOfReceipt);
      return date1 - date;
    });

    return sortedByDate.map(record => {
      return {
        name: moment(record.timeOfReceipt).format("MMM Do YY"),
        temperature: record.temperature,
        pulse: record.pulse,
				bloodGlucose: record.bloodGlucose,
				pressureUp: record.pressureUp,
				pressureDown: record.pressureDown,
      }
    })
  };

  if (records && !records.length) return null; 
  return (
		<Container>
		<InnerContainer>
      <Heading>Diagram</Heading>
      <LineChart width={730} height={250} data={transformDataForDiagram(records)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="red" />
        <Line type="monotone" dataKey="bloodGlucose" stroke="blue" />
				<Line type="monotone" dataKey="pulse" stroke="green" />
				<Line type="monotone" dataKey="pressureUp" stroke="pink" />
				<Line type="monotone" dataKey="pressureDown" stroke="orange"/>
			</LineChart>
			</InnerContainer>
    </Container>
  );
});

const stateToProps = state => ({
  records: ProfileSelector.getRecords(state),
});

export default connect(stateToProps, {})(Diagram);
