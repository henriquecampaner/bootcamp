import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/page/SignIn';
import Students from '~/page/Students';
import Plans from '~/page/Plans';
import EditStudent from '~/page/Students/EditStudent';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/edit/:id" component={EditStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
    </Switch>
  );
}
