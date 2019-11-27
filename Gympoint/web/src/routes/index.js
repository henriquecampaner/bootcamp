import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/page/SignIn';
import Students from '~/page/Students/ListStudents';

import Plans from '~/page/Plans/ListPlans';
import EditPlans from '~/page/Plans/EditPlan';

import EditStudent from '~/page/Students/EditStudent';
import CreateStudent from '~/page/Students/CreateStudent';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/create" component={CreateStudent} isPrivate />
      <Route path="/students/edit/:id" component={EditStudent} isPrivate />
      <Route path="/students/edit" component={EditStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />

      <Route path="/plans/edit/:planId" exact component={EditPlans} isPrivate />
      <Route path="/plans/edit" exact component={EditPlans} isPrivate />
      <Route path="/plans/create" exact component={Plans} isPrivate />
      <Route path="/plans/:planId" exact component={Plans} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
    </Switch>
  );
}
