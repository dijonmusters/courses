const mapIntervalToEnum = (interval) => {
  switch (interval) {
    case 'month':
      return 'MONTHLY'
    case 'year':
      return 'YEARLY'
    default:
      return 'INACTIVE'
  }
}

module.exports = async (req, res) => {
  const { type } = req.body
  const { userId, courseId } = req?.body?.data?.object?.metadata

  switch (type) {
    case 'charge.succeeded':
      console.log(req.body)

      // update user -> courses to contain courseId
      console.log('charge successful!')
      break
    case 'customer.subscription.created':
      const interval = req?.body?.data?.object?.plan?.interval
      console.log(interval)
      console.log(mapIntervalToEnum(interval))

      console.log('subscription successful!')
      // console.log(JSON.stringify(req.body, null, 2))
      // console.log(userId)

      // update user -> subscriptionStatus to interval
      break
    default:
      console.log(`Unhandled event type ${type}`)
  }

  res.send({ received: true })
}
