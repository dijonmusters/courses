import Container from 'components/Container'
import Link from 'next/link'
import { getSession } from '@auth0/nextjs-auth0'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { processPayment } from 'utils/payment'
import Player from 'react-player/lazy'

const LessonPage = ({ lesson: { title, videoUrl, courseId }, user }) => {
  return (
    <Container>
      <div className="bg-white text-gray-600 w-full px-8 pt-8 pb-8 rounded-md relative">
        <h2 className="text-3xl mb-4">{title}</h2>
        {videoUrl ? (
          <div className="relative" style={{ height: '56.25%' }}>
            <Player width="100%" height="100%" url={videoUrl} controls={true} />
          </div>
        ) : user ? (
          <>
            <Link href="/pricing">
              <a className="bg-green-200 rounded-md py-2 px-4">Subscribe</a>
            </Link>
            <button
              className="rounded-md ml-2 py-2 px-4 border"
              onClick={() => processPayment(courseId)}
            >
              Buy course
            </button>
          </>
        ) : (
          <Link href="/api/auth/login">
            <a className="bg-green-200 rounded-md py-2 px-4">Login</a>
          </Link>
        )}
      </div>
    </Container>
  )
}

export const getServerSideProps = async ({ req, res, params }) => {
  const { slug } = params
  const session = await getSession(req, res)
  const email = session?.user?.email

  const prisma = new PrismaClient()

  const lesson = await prisma.lesson.findUnique({
    where: {
      slug,
    },
    include: {
      course: true,
    },
  })

  let user = null
  if (email) {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        courses: true,
      },
    })
  }

  await prisma.$disconnect()

  const userAllowedCourse =
    lesson.course.price === 0 ||
    user?.isSubscribed ||
    user?.courses.find((course) => course.id === lesson.course.id)

  if (!userAllowedCourse) {
    lesson.videoUrl = null
  }

  return {
    props: {
      lesson: JSON.parse(JSON.stringify(lesson)),
      user: session?.user || null,
    },
  }
}

export default LessonPage
