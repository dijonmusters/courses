const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { getUserByEmail } from 'utils/db'

module.exports = withApiAuthRequired(async (req, res) => {
  const { priceId } = req.query
  const {
    user: { email },
  } = getSession(req, res)
  const user = await getUserByEmail(email)

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
    metadata: {
      userId: user.id,
    },
  })

  res.json({ id: session.id })
})
