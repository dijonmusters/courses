import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const Protected = () => {
  return <p>Authed</p>
}

export const getServerSideProps = withPageAuthRequired()

export default Protected
