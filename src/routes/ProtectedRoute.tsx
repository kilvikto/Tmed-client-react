import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 


const ProtectedRoute = ({ // HOC high-order-component
  component: Component,
  user,
  path,
  ...rest
}) => {
  const authenticated = user.nameId && user.role;
  const isAuthRoute = path === '/login' || path === '/signup';

  if (authenticated && isAuthRoute) return <Redirect to='/profile' />
  else if (!authenticated && isAuthRoute) {
    return <Route {...rest} path={path} render={props => <Component {...props} />} />;
  }; 
  
  return (
    <Route 
      {...rest} 
      path={path}
      render={props => <Component {...props} user={user} />}
    />
  );
};

export default ProtectedRoute;
