import React from 'react';
import styled from 'styled-components';
import { RouteProps } from 'react-router-dom';


const Wrapper = styled.main`
  height: 100%;
  padding-top: 2rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
`;

const MainHeading = styled.h1`
`;

const ContentBlock = styled.div`
`;

const Image = styled.img`
  height: 500px;
  width: 800px;
`;

const Text = styled.p`

`;

interface IHome extends RouteProps {

}

const Home: React.FC<IHome>= () => {
  return (
    <Wrapper>
      <Container>  
        <MainHeading>Welcome to TMed!</MainHeading>
        <ContentBlock>
          <Text>Our company makes new software solutions for modern medical institutes</Text>        
          <Image src="medical-photo.jpg" />
        </ContentBlock>
      </Container>
    </Wrapper>
  );
};

export default Home;
