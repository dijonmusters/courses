import { getCourses, getCourseBySlug } from 'utils/db'
import Container from 'components/Container'
import Link from 'next/link'

const CoursePage = ({ course: { title, price, lessons } }) => {
  const isFree = price === 0

  return (
    <Container>
      <div className="bg-white text-gray-600 w-full px-8 pt-8 pb-8 rounded-md relative">
        <h2 className="text-3xl">{title}</h2>
        <ul className="p-2">
          {lessons.map((lesson, i) => (
            <li key={lesson.id}>
              <Link href={`/lesson/${lesson.slug}`}>
                <a>
                  {i + 1}. {lesson.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const courses = await getCourses()

  const paths = courses.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params

  console.log(slug)

  const course = await getCourseBySlug(slug)

  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
    },
  }
}

export default CoursePage
