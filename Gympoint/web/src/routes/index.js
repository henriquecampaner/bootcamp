import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/page/SignIn';

import CreatePlans from '~/page/Plans/CreatePlan';
import Plans from '~/page/Plans/ListPlans';
import EditPlans from '~/page/Plans/EditPlan';

import Students from '~/page/Students/ListStudents';
import EditStudent from '~/page/Students/EditStudent';
import CreateStudent from '~/page/Students/CreateStudent';

import Enrollments from '~/page/Enrollment/ListEnrollment';
import EditEnrollments from '~/page/Enrollment/EditEnrollment';
import CreateEnrollments from '~/page/Enrollment/CreateEnrollment';

import ListHelp from '~/page/AwnserRequest';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/create" component={CreateStudent} isPrivate />
      <Route path="/students/edit/:id" component={EditStudent} isPrivate />
      <Route path="/students/edit" component={EditStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />

      <Route path="/plans/edit" exact component={EditPlans} isPrivate />
      <Route path="/plans/edit/:id" exact component={EditPlans} isPrivate />
      <Route path="/plans/create" exact component={CreatePlans} isPrivate />
      <Route path="/plans/:id" exact component={Plans} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />

      <Route
        path="/enrollments/edit/:id"
        exact
        component={EditEnrollments}
        isPrivate
      />
      <Route
        path="/enrollments/create"
        exact
        component={CreateEnrollments}
        isPrivate
      />
      <Route path="/enrollments" exact component={Enrollments} isPrivate />

      <Route path="/help" exact component={ListHelp} isPrivate />
    </Switch>
  );
}
