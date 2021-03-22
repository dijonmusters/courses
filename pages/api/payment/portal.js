const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const products = require('./products.json')
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

module.exports = withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res)
  console.log(user)
  // const { userId, stripeId } = req.body

  // // const { sessionId } = req.body
  // // const checkoutsession = await stripe.checkout.sessions.retrieve(sessionId)

  // // This is the url to which the customer will be redirected when they are done
  // // managing their billing with the portal.
  // const returnUrl = process.env.CLIENT_URL

  // const portalsession = await stripe.billingPortal.sessions.create({
  //   customer: stripeId,
  //   return_url: returnUrl,
  // })

  // res.send({
  //   url: portalsession.url,
  // })

  res.send({
    user,
  })
})
