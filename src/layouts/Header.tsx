import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BaseLink } from 'styles/typography';
import { AuthSelector, AuthAction } from 'model/user';

const Wrapper = styled.header`
  height: 5rem;
  width: 100%;
  background-color: #78ba54;
  border-bottom: 1px solid #173019;
  box-sizing: border-box;
`;

const Container = styled.div`
    height: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 5%;
    /* background: red; */
`;

const HeaderLeft = styled.section`

`;

const HeaderRight = styled.section`

`;

const LogoBlock = styled(BaseLink)`
  width: 8rem;
  height: 5rem;
  display: flex;
  position: relative;
  cursor: pointer;
  user-select: none;
  text-align: left;
`;

const Slogan = styled.span`
  position: absolute;
  left: 0%;
  top: calc(90% - 1.2rem);
  font-size: 0.6rem;
  font-family: Verdana, Geneva, sans-serif;
`;

const ButtonBlock = styled.div`
  height: 2.5rem;
  max-width: 20rem;
  min-width: 6rem;
  display: flex;
  /* background: yellow; */
  align-items: center;
  justify-content: flex-end;
`;


const randomName = btoa(String(Math.random())); 

const Button = styled(BaseLink)`
  &.${randomName} {
    color: #173019;
    border: 1px solid #173019;
    background-color: #74a858;
  };

  display: block;
  margin-left: 0.5rem;
  min-width: 6rem;
  text-align: center;
  font-weight: bold;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: #78ba54;
  color: #173019;

  &:hover {
    color: #fafcf5;
    border: 1px solid #173019;
    background-color: #74a858;
  }
`;


const LogoText = styled.h1`
  font-family: "Impact";
  font-size: 3rem;
  color: #173019;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;


type IHeader = {
  user: {
    nameId: string,
    role: string
  },
  onLogout: () => void
};

const Header: React.FC<IHeader> = React.memo(({
  user,
  onLogout,
}) => {
  const isAuth = user.nameId && user.role;  

  return (
    <Wrapper>
      <Container>
        <HeaderLeft>
          <LogoBlock to='/'>
            <LogoText>
              TMed
              <Slogan>The first wealth is health</Slogan>
            </LogoText>
          </LogoBlock>
        </HeaderLeft>
        <HeaderRight>
          <ButtonBlock>
            <Button 
              exact to='/'
              activeClassName={randomName}
            >
              Home
            </Button>
            {isAuth && (
              <>
              <Button exact to='/profile' activeClassName={randomName}>Profile</Button>
              <Button exact to='' onClick={onLogout}>Log out</Button>
              </>
            )}
            {!isAuth && (
              <Button exact activeClassName={randomName} to='/login'>Log in</Button>
            )}
          </ButtonBlock>
        </HeaderRight>
      </Container>
    </Wrapper>
  );
});

const stateToProps = (state) => ({
  user: AuthSelector.getUser(state),
});

const dispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthAction.logOut()),
});

export default connect(stateToProps, dispatchToProps)(Header);
