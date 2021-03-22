const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const products = require('./products.json')

module.exports = async (req, res) => {
  // const { cart } = JSON.parse(event.body);
  const { userId, courseId } = req.body
  console.log(userId)

  // const cartWithProducts = cart.map(({ id, qty }) => {
  //   const product = products.find((p) => p.id === id);
  //   return {
  //     ...product,
  //     qty,
  //   };
  // });

  // const cartWithProducts = [
  //   {
  //     id: 1,
  //   },
  // ]

  // console.log(cartWithProducts)
  // talking to Stripe
  const lineItems = [
    {
      // price: 'price_1IWgD2FCLZr6OgzIK4Jant40',
      price: 'price_1IWgDtFCLZr6OgzIeDyjckUI',
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
    metadata: {
      userId,
      courseId,
    },
  })

  // charging the card
  res.json({ id: session.id })
}
