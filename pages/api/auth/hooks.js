import { createUser } from 'utils/db'
import { createCustomer } from 'utils/stripe'

module.exports = async (req, res) => {
  const { email, secret } = JSON.parse(req.body)

  if (secret === process.env.AUTH0_HOOK_SECRET) {
    try {
      console.log('creating user')
      const customer = await createCustomer(email)
      await createUser(email, customer.id)
      console.log(`created user (${email}) with Stripe ID(${customer.id})`)
      res.send({ received: true })
    } catch (err) {
      console.log(err)
      res.send({ received: true })
    }
  } else {
    console.log('You forgot to send me your secret!')
    res.send('You forgot to send me your secret!')
  }
}
