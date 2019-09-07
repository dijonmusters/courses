import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const renderCourse = course => (
  <p key={course.code}>
    {course.code}: {course.title}
  </p>
);

const Courses = () => {
  const { loading, error, data } = useQuery(gql`
    {
      courses {
        title
        code
      }
    }
  `);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return data.courses.map(renderCourse);
};

export default Courses;
