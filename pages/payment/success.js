import Container from 'components/Container'

const Success = () => {
  return (
    <Container>
      <div className="bg-white text-gray-600 w-full px-8 pt-8 pb-8 rounded-md relative">
        <h2 className="text-3xl font-md my-2">Payment successful</h2>
        <p>Thank you for your purchase!</p>
      </div>
    </Container>
  )
}

export default Success
