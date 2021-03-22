import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0'

const Test = ({ userId }) => {
  const { user } = useUser()

  console.log(user)
  console.log(userId)

  const processPayment = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    const { data } = await axios.post('/api/payment/charge-card', {
      userId,
      courseId: 88888,
    })
    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  const processSubscription = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    const { data } = await axios.post('/api/payment/create-subscription', {
      userId,
    })
    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  const manageSubscription = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    const { data } = await axios.post('/api/payment/portal', {
      userId,
      stripeId: 'cus_J8yPC9wDMBcAB0',
    })
    // await stripe.redirectToCheckout({ sessionId: data.id })
    // window.location.href = data.url
    console.log(data)
  }

  return (
    <>
      <button onClick={processPayment}>Process Payment</button>
      <button onClick={processSubscription}>Process Subscription</button>
      <button onClick={manageSubscription}>Manage Subscription</button>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    return {
      props: { userId: 111111 },
    }
  },
})

export default Test
