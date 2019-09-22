import React from 'react';
import { Router } from '@reach/router';

const AddRouteParams = () => (
    <Router>
      <Lesson path="/learn/:moduleName/:slug" />
    </Router>
);

const Lesson = props => {
  console.log(props)
  // TODO: Fetch lesson based on moduleName and slug
  return (
    <h1>Specific Lesson</h1>
  );
}


export default AddRouteParams;
