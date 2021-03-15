import CourseList from 'components/CourseList'
import axios from 'axios'

// const base = process.env.NEXT_PUBLIC_API_BASE
// const isDev = process.env.NODE_ENV === 'development'

// const host =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3000'
//     : 'https://jonmeyers.io'

const Index = ({ courses }) => {
  return <CourseList courses={courses} />
}

export const getStaticProps = async () => {
  const { data: courses } = await axios.get(`/api/get-courses`)

  console.log(courses)

  return {
    props: {
      courses,
    },
  }
}

export default Index
