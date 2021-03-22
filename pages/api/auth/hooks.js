import { createUser } from '../../../utils/db'

module.exports = async (req, res) => {
  const { email, secret } = JSON.parse(req.body) // look at content type of auth0 request

  if (secret === process.env.AUTH0_HOOK_SECRET) {
    await createUser(email)
    console.log(`created user: ${email}`)
    res.send({ received: true })
  } else {
    console.log('You forgot to send me your secret!')
    res.send('You forgot to send me your secret!')
  }
}
