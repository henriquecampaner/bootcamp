import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/page/SignIn';
import Students from '~/page/Students';
import EditStudent from '~/page/Students/EditStudent';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" component={Students} isPrivate />

      <Route path="/editstudents" component={EditStudent} isPrivate />
    </Switch>
  );
}
