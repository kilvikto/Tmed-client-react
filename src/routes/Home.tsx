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
	height: 90%;
	background-image: url("medical-photo.jpg");
	background-size: cover;
  background-repeat: no-repeat;
`;

const MainHeading = styled.h1`
`;

const ContentBlock = styled.div`
	height: 700px;
	width: 1000px;

`;

const Image = styled.img`
  height: 500px;
  width: 800px;
`;

const Text = styled.p`
		font-size: 20px;
		text-align: center;
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
        </ContentBlock>
      </Container>
    </Wrapper>
  );
};

export default Home;
