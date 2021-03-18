const CourseList = ({ courses }) => {
  return (
    <>
      <h1 className="text-6xl font-bold">Courses</h1>
      <pre className="mt-8 bg-white bg-opacity-10 text-white rounded-md p-6">
        {JSON.stringify(courses, null, 2)}
      </pre>
    </>
  )
}

export default CourseList
