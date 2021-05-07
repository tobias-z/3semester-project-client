import * as React from "react"
import {Container, Button, Table} from "react-bootstrap"

function ConfirmationPage(props) {
  const {checkoutForm} = props
  const currentDate = new Date(checkoutForm.delivery)

  function payForOrder() {
    //Make function to send order to backend
  }

  return (
    <Container>
      <h1 className="text-center">Confirm order</h1>
      <div>
        <h3>Contact Information</h3>
        <p>Name: {checkoutForm.name}</p>
        <p>Email: {checkoutForm.email}</p>
        <p>Phone number: {checkoutForm.phone}</p>
        <p>Address: {checkoutForm.address}</p>
      </div>
      <hr />
      <div>
        <h3>Your order</h3>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tuborg classic</td>
              <td>5</td>
              <td>140</td>
            </tr>
            <tr>
              <td>Pizza large</td>
              <td>2</td>
              <td>55</td>
            </tr>
            <tr>
              <td>Greek salat</td>
              <td>2</td>
              <td>10</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr className="my-4" />
      <div>
        <h4>
          Time of delivery: {currentDate.getHours()}:
          {currentDate.getUTCMinutes()} - {currentDate.getDate()}/
          {currentDate.getUTCMonth() + 1}/{currentDate.getFullYear()}
        </h4>
        <Button onClick={payForOrder} block size="lg" variant="success">
          Confirm order
        </Button>
      </div>
    </Container>
  )
}

export default ConfirmationPage
