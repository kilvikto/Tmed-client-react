import React from 'react'
import styled from 'styled-components';


const Wrapper = styled.footer`
  height: 5rem;
  border-top: 2px solid #173019;
  background-color: #78ba54; 
  box-sizing: border-box;
  color: #173019;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin: 0 5%;
`;

const SocialBlock = styled.div`
  box-sizing: border-box;
`;

const Text = styled.p`
  padding: 5px 0;
  margin: 0;
  font-weight: bold;
  vertical-align: center;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <SocialBlock>
          <Text>
            <Icon src="mail.svg"/>
            Email: kielvika@gmail.com
          </Text>
          <Text>
            <Icon src="phone.svg" />
            Support Service: +420 722 491 402
          </Text> 
        </SocialBlock>    
      </Container>    
    </Wrapper>    
  );
};

export default Footer;
