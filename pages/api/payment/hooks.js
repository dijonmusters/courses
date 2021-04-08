import { enrolUser, subscribeUser, cancelSubscription } from 'utils/db'

module.exports = async (req, res) => {
  const { type } = req.body

  switch (type) {
    case 'charge.succeeded':
      const { userId, courseId } = req?.body?.data?.object?.metadata
      if (courseId) {
        const enrolledUser = await enrolUser(
          parseInt(userId),
          parseInt(courseId)
        )
        console.log(
          `${enrolledUser.email} enrolled in ${
            enrolledUser.courses.find((c) => c.id === parseInt(courseId)).title
          }`
        )
        break
      }
    case 'customer.subscription.created':
      const subscribedUser = await subscribeUser(
        req?.body?.data?.object?.customer
      )
      console.log(`${subscribedUser.email} subscribed`)
      break
    case 'customer.subscription.deleted':
      const cancelledUser = await cancelSubscription(
        req?.body?.data?.object?.customer
      )
      console.log(`${cancelledUser.email} subscription expired`)

      break
    default:
      console.log(`Unhandled event type ${type}`)
  }

  res.send({ received: true })
}
