import Container from 'components/Container'
import Link from 'next/link'
const initStripe = require('stripe')
import { processSubscription } from 'utils/payment'
import { useUser } from '@auth0/nextjs-auth0'

const PricingPage = ({ plans }) => {
  const { user } = useUser()
  return (
    <Container>
      <div className="flex w-full items-center justify-center">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="h-80 w-80 mx-2 bg-white text-gray-700 flex flex-col"
          >
            <h2 className="text-4xl py-8 font-medium text-center border-b border-gray-300">
              {plan.name}
            </h2>
            <p className="flex-1 p-8 flex flex-col items-center">
              <span className="text-gray-600 text-3xl">
                ${plan.price / 100}
                <span className="text-gray-400 text-sm uppercase">
                  {plan.currency}
                </span>
              </span>
              <span className="text-xl text-gray-400">{plan.interval}ly</span>
            </p>
            {user ? (
              <button
                className="py-4 bg-green-200 text-center"
                onClick={() => processSubscription(plan.id)}
              >
                Subscribe
              </button>
            ) : (
              <Link href="/api/auth/login">
                <a className="py-4 bg-green-200 text-center">Create account</a>
              </Link>
            )}
          </div>
        ))}
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
  const { data: prices } = await stripe.prices.list()
  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product)
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        currency: price.currency,
      }
    })
  )

  return {
    props: {
      plans: plans.reverse(),
    },
  }
}

export default PricingPage
