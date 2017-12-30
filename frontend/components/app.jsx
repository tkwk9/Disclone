import React from 'react';
import { Switch, Route } from 'react-router';
import SessionForm from './session/session_form';

export default () => {
  return (
    <div className='app'>
      <div className='page'>
        <Switch>
          <Route path='/login' component={SessionForm} />
          <Route path='/signup' component={SessionForm} />
        </Switch>
      </div>
    </div>
  );
};
