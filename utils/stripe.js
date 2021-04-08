const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createCustomer = async (email) =>
  stripe.customers.create({
    email,
  })

export { createCustomer }
