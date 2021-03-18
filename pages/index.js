import CourseList from 'components/CourseList'
import { getCourses } from '../utils/db'
import { useUser } from '@auth0/nextjs-auth0'

const Index = ({ courses }) => {
  const { user } = useUser()
  console.log(user)

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
