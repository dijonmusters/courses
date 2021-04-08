import { getCourses } from 'utils/db'
import { useUser } from '@auth0/nextjs-auth0'
import Container from 'components/Container'
import Link from 'next/link'

const Index = ({ courses }) => {
  const { user } = useUser()

  return (
    <Container>
      <div>
        <div className="flex flex-wrap">
          {courses.map(({ title, slug, price }) => {
            const isFree = price === 0

            return (
              <Link href={`/course/${slug}`} key={slug}>
                <a className="bg-white mx-2 my-2 text-gray-600 w-56 px-8 pt-8 pb-8 rounded-md relative">
                  <h1 className="">{title}</h1>
                  <span
                    className={`${
                      isFree ? 'bg-green-200' : 'bg-pink-200'
                    } absolute bottom-1 right-1 rounded-md py-2 px-4 text-xs`}
                  >
                    {isFree ? 'Free' : `$${price / 100}`}
                  </span>
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
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
