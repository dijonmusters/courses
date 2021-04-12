// pages/api/stripe-hooks

import initStripe from 'stripe'
import { buffer } from 'micro'
import { PrismaClient } from '@prisma/client'

const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
const prisma = new PrismaClient()

export const config = { api: { bodyParser: false } }

export default async (req, res) => {
  const reqBuffer = await buffer(req)
  const signature = req.headers['stripe-signature']
  const signingSecret = process.env.STRIPE_SIGNING_SECRET

  let event

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
  } catch (err) {
    console.log(err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  const { metadata } = event.data.object
  const stripeId = event.data.object.customer

  switch (event.type) {
    case 'charge.succeeded':
      if (metadata?.userId && metadata?.courseId) {
        const user = await prisma.user.update({
          where: {
            id: parseInt(metadata.userId),
          },
          data: {
            courses: {
              connect: {
                id: parseInt(metadata.courseId),
              },
            },
          },
        })
      }
      break
    case 'customer.subscription.created':
      if (stripeId) {
        await prisma.user.update({
          where: {
            stripeId,
          },
          data: {
            isSubscribed: true,
          },
        })
      }
      break
    case 'customer.subscription.updated':
      if (stripeId) {
        await prisma.user.update({
          where: {
            stripeId,
          },
          data: {
            isSubscribed: true,
          },
        })
      }
      break
    case 'customer.subscription.deleted':
      if (stripeId) {
        await prisma.user.update({
          where: {
            stripeId,
          },
          data: {
            isSubscribed: false,
          },
        })
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.send({ received: true })
}
