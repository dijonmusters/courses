import CourseList from 'components/CourseList'
import { getCourses } from '../utils/db'

const Index = ({ courses }) => {
  return <CourseList courses={courses} />
}

export const getStaticProps = async () => {
  const data = await getCourses()

  return {
    props: {
      courses: JSON.parse(JSON.stringify(data)),
    },
  }
}

export default Index
