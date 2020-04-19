import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BaseLink } from 'styles/typography';
import { AuthAction, AuthSelector } from 'model/user';


export const Wrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const AuthForm = styled.form`
  min-height: 20rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafcf5;
`;

export const LinkContainer = styled.div`
  display: flex;
  width: 20.8rem;
  justify-content: space-between;
`;

export const FormLink = styled(BaseLink)`
  padding-top: 1rem;
  font-size: 1rem;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: underline;
    color: #173019;
  }
`; 


export const Input = styled.input`
  position: relative;
  width: 20rem;
  padding: 0.4rem;  
  border: none;
  outline: 1px solid #173019;

  &:focus {
    outline: 2px solid #74a858;
  }
`;  

export const Label = styled.label`
  position: absolute;
  bottom: 105%;
  left: 0;
  z-index: 9;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 20rem;
  height: 5rem;
  padding-top: 1rem;
`;
export const ButtonWrapper = styled.div``;

export const Button = styled.input`
  text-align: center;
  margin: 1rem; 
  padding: 0.5rem 1rem;
`;

export const InputBlock = styled.div`
  position: relative;
  margin-top: 1.4rem;
  color: #173019;
`;

export const Heading = styled.h1`
  color: #173019;
  font-size: 2.5rem;
`;

const MinorHeading = styled.h4`
  padding: 0;
  color: #173019;
  margin: 0 0 0.2rem 0;
`;

const RoleRadioGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0;
  margin: 0;
  width: 20rem;
  height: 2rem;
`;

const RadioInputBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioInput = styled.input`
`;

const RadioLabel = styled.label`
  display: block;
  padding-right: 0.5rem;
`;

const ErrMessage= styled.h5`
  margin: 0.4rem 0 0 0;
  color: red;
`;

interface IAuth {
  history: any,
  _request: {
    isLoading: boolean,
    error: string 
  },
  authenticate: (creds: { email: string, password: string }) => void,
  register: (creds: { email: string, password: string, role: string  }) => void,
};

const LOGIN_ROUTE = '/login';
const REG_ROUTE = '/signup';

const Auth: React.FC<IAuth> = ({ 
  history: { location: { pathname } },
  register,
  _request,
  authenticate 
}) => {
  const [reqState, setReqState] = useState({
    isLoading: false,
    reqError: '' 
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    role: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setReqState({
      isLoading: _request.isLoading,
      reqError: _request.error        
    });
  }, [_request])

  useEffect(() => {
    setReqState({
      isLoading: false,
      reqError: ''
    });
    setLoginData({
      email: '',
      password: ''
    });
    setSignupData({
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }, [pathname]);

  const handleRadioClick = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupData({
      ...signupData,
      [name]: value
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;

    switch (pathname) {
      case LOGIN_ROUTE: 
        return setLoginData({
          ...loginData,
          [id]: value
        });
      case REG_ROUTE:
        return setSignupData({
          ...signupData,
          [id]: value
        });
      default: return null;          
    }
  };

  const sendAuthData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (pathname) {
      case LOGIN_ROUTE: 
        return authenticate(loginData);

      case REG_ROUTE:
        return register(signupData);
 
      default: return null;
    };
  };
    
  return (
    <Wrapper>
      <Container>
        <AuthForm onSubmit={sendAuthData}>
          <Heading>
            {pathname === LOGIN_ROUTE && 'Welcome back!'}
            {pathname === REG_ROUTE && 'First time?'}
          </Heading>
          {pathname === REG_ROUTE && (
            <>
              <MinorHeading>Choose your role</MinorHeading>
              <RoleRadioGroup>
                <RadioInputBlock>
                  <RadioLabel htmlFor="pacient">pacient</RadioLabel>
                  <RadioInput
                    id="pacient"
                    type="radio"
                    name="role"
                    value="pacient"
                    onClick={handleRadioClick}
                  />
                </RadioInputBlock>
                <RadioInputBlock>
                  <RadioLabel htmlFor="doctor">doctor</RadioLabel>
                  <RadioInput
                    id="doctor"
                    type="radio"
                    name="role"
                    value="doctor"
                    onClick={handleRadioClick}
                  />
                </RadioInputBlock>
              </RoleRadioGroup>
            </>
          )}
          <InputBlock>
            <Label htmlFor="email">email</Label>
            <Input 
              id="email"
              type="email"
              value={loginData.email || signupData.email}
              onChange={handleChange}
              required
            />
          </InputBlock>
          <InputBlock>
            <Label htmlFor="password">password</Label>
            <Input 
              id="password"
              type="password" 
              min={6}
              pattern=".{6,}" 
              title="Six or more characters"
              value={loginData.password || signupData.password}
              onChange={handleChange}
              required
            />
          </InputBlock>
          {pathname === REG_ROUTE && (
            <InputBlock>
              <Label htmlFor="confirmPassword">confirm password</Label>
              <Input 
                id="confirmPassword" 
                required
                type="password" 
                onChange={handleChange}
              />
            </InputBlock>
          )}
          {pathname === LOGIN_ROUTE && (
            <LinkContainer>
              <FormLink to='/help'>forgot password?</FormLink>
              <FormLink to='/signup'>Register</FormLink>
            </LinkContainer>
          )}
          {reqState.reqError && (<ErrMessage>{reqState.reqError}</ErrMessage>)}
          <ButtonContainer>
            <BaseLink to='/'>
              <Button
                type="button"
                value="Cancel"
              />
            </BaseLink>
            <ButtonWrapper>
              <Button 
                type="submit"
                value={pathname === REG_ROUTE ? 'Register': 'Log in' } 
                disabled={reqState.isLoading}
              />
            </ButtonWrapper>
          </ButtonContainer>
        </AuthForm>    
      </Container>
    </Wrapper>
  );
};

const stateToProps = (state) => ({
  _request: AuthSelector.getRequestState(state)
});

const dispatchToProps = (dispatch) => ({
  authenticate: (credentials) => dispatch(AuthAction.authenticate(credentials)),
  register: (credentials) => dispatch(AuthAction.register(credentials)),
});

export default connect(stateToProps, dispatchToProps)(Auth);
