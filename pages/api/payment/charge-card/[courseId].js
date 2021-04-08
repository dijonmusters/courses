import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { getCourse, getUserByEmail } from 'utils/db'

module.exports = withApiAuthRequired(async (req, res) => {
  const { courseId } = req.query
  const {
    user: { email },
  } = getSession(req, res)
  const user = await getUserByEmail(email)
  const course = await getCourse(parseInt(courseId))

  const lineItems = [
    {
      price_data: {
        currency: 'aud',
        product_data: {
          name: course.title,
        },
        unit_amount: course.price,
      },
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeId,
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/course/${course.slug}`,
    // TODO! Make success URL a dynamic route for course successfully purchased with link to watch
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
    payment_intent_data: {
      metadata: {
        userId: user.id,
        courseId,
      },
    },
  })

  // charging the card
  res.json({ id: session.id })
})
