const CourseList = ({ courses }) => {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-indigo-400 text-white">
      <h1 className="text-6xl font-bold">Courses</h1>
      <pre className="mt-8 bg-white bg-opacity-10 text-white rounded-md p-6">
        {JSON.stringify(courses, null, 2)}
      </pre>
    </div>
  )
}

export default CourseList
