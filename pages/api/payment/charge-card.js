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
      price_data: {
        currency: 'aud',
        product_data: {
          name: 'Build an E-commerce Platform with Stripe',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
    payment_intent_data: {
      metadata: {
        userId,
        courseId,
      },
    },
  })

  // charging the card
  res.json({ id: session.id })
}
