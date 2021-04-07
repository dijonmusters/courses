import { getUserByEmail } from 'utils/db'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

module.exports = withApiAuthRequired(async (req, res) => {
  // const session = getSession(req, res)
  // console.log(session)
  const { email } = req.query
  const user = await getUserByEmail(email)
  res.send(user)
})

// TODO! Lock this down to only this specific user!
