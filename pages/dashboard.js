import Container from 'components/Container'
import Link from 'next/link'
const initStripe = require('stripe')
import { processSubscription } from 'utils/payment'
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { loadPortal } from 'utils/payment'
import { PrismaClient } from '@prisma/client'

const DashboardPage = ({ plans, dbUser }) => {
  return (
    <Container>
      <div className="bg-white w-full text-gray-600 p-8">
        <h2 className="text-3xl font-md my-2">Subscription</h2>
        {dbUser.isSubscribed ? (
          <p className="mx-4">Your subscription is active</p>
        ) : (
          <p className="mx-4">You do not have a subscription</p>
        )}
        <button
          className="mx-4 bg-blue-400 text-white px-4 py-2 rounded mt-2"
          onClick={loadPortal}
        >
          Manage subscription
        </button>
        <h2 className="text-3xl font-md mt-4 mb-2">Purchased courses</h2>
        {dbUser.courses.map(({ title, slug }) => (
          <Link href={`/${slug}`} key={slug}>
            <a className="mx-4">{title}</a>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, params }) {
    const {
      user: { email },
    } = await getSession(req)

    const prisma = new PrismaClient()

    const dbUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        courses: true,
      },
    })

    await prisma.$disconnect()

    return {
      props: {
        dbUser: JSON.parse(JSON.stringify(dbUser)),
      },
    }
  },
})

export default DashboardPage
