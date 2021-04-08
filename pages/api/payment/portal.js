import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { getCourse, getUserByEmail } from 'utils/db'

module.exports = withApiAuthRequired(async (req, res) => {
  const {
    user: { email },
  } = getSession(req, res)

  const user = await getUserByEmail(email)

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeId,
    return_url: process.env.CLIENT_URL,
  })

  res.send({
    url: session.url,
  })
})
