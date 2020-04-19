import React from 'react';
import { connect } from 'react-redux';
import { AuthSelector } from 'model/user';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import Home from './Home'; 
import Auth from './Auth';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';


type IRouteContainer = {
  user: {
    nameId: string,
    role: string,
  }
};

const RouteContainer: React.FC<IRouteContainer> = ({
  user,
}) => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route exact path='/' render={props => <Home {...props} />} />
          <ProtectedRoute exact path='/login' component={Auth} user={user} />
          <ProtectedRoute exact path='/signup' component={Auth} user={user} />
          <ProtectedRoute exact path='/profile' component={Profile} user={user} />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
};


const mapToProps = (state) => ({
  user: AuthSelector.getUser(state),
});

export default connect(mapToProps, {})(RouteContainer);
