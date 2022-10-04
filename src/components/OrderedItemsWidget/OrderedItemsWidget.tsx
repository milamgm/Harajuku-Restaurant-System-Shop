import { useCartContext } from "../../context/UseStateContext";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import OrderedItemsItem from "./OrderedItemsItem";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase/firebaseConfig.js";

const OrderedItemsWidget = () => {
  const {
    orderContainer,
    toggleOrderContainer,
    orderedItems,
    onCookingItemsFetch,
    completedItemsFetch,
  } = useCartContext();

  return (
    <Container>
      <Offcanvas
        show={orderContainer}
        onHide={() => toggleOrderContainer()}
        placement="bottom"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex justify-content-center">
          <Row>
            <Col sm="6">
              <h5>Being prepared now...</h5>
              <Row className="mt-4">
                {onCookingItemsFetch.length > 0 &&
                  onCookingItemsFetch.map((item) => (
                    <Col sm="12" lg="6">
                      <OrderedItemsItem key={item.id} {...item} cssClass="onCooking-item"/>
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col sm="6">
              {completedItemsFetch.length > 0 && (
                <div>
                  <h5>Completed Items</h5>
                  <Row className="mt-4">
                    {completedItemsFetch.map((item) => (
                      <Col sm="12" lg="6">
                        <OrderedItemsItem key={item.id} {...item} cssClass="completed-item" />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}{" "}
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default OrderedItemsWidget;
