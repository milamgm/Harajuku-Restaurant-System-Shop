import React from 'react'
import { Container, Offcanvas } from 'react-bootstrap'
import { useCartContext } from '../../context/UseStateContext'

const CompletedItemsWidget = () => {
    const {orderContainer, toggleOrderContainer, completedItemsFetch} = useCartContext()
  console.log(completedItemsFetch)
    return (
      <Container>
            {completedItemsFetch.length > 0 && completedItemsFetch.map(item => (
              <h6 key={item.id}>{item.quantity} &times; {item.name}</h6>
             ))}
        </Container>
    )
}

export default CompletedItemsWidget