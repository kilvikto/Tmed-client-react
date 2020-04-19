import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';


const Container = styled.div`
  position: relative;
  background-color: #fafcf5;
  min-height: 100vh;
  width: 100%;
  min-width: 800px;
`;

const InnerContainer = styled.main`
  min-height: 100vh;
  margin: 0 5%;
  background-color: #fafcf5; // lightgray
  overflow: auto;
`;

interface ILayout {
  children: React.ReactNode,
};

const AppLayout: React.FC<ILayout> = ({ children }) => {
  return (
    <Container>
      <Header />
        <InnerContainer>
          {children}
        </InnerContainer>
      <Footer />
    </Container>
  );
};

export default AppLayout;
