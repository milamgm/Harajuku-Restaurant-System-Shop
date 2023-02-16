import { Alert, Col, Container, Offcanvas, Row } from "react-bootstrap";
import OrderedItemsItem from "./OrderedItemsItem";
import { IItem } from "../../types/types";
import { useAppContext } from "../../context/AppContext";

const OrderedItemsWidget = () => {
  const {
    orderContainer,
    setOrderContainer,
    onCookingItemsFetch,
    completedItemsFetch,
  } = useAppContext();

  return (
    <Container>
      <Offcanvas
        show={orderContainer}
        onHide={() => setOrderContainer((prev) => !prev)}
        placement="bottom"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Dishes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex justify-content-between ">
          <Row className="w-100 ">
            <Col sm="6">
              <h5>Being prepared now</h5>
              <Row className="mt-4">
                {onCookingItemsFetch.length > 0 &&
                  onCookingItemsFetch.map((item: IItem) => (
                    <Col sm="12" lg="6" key={item.id}>
                      <Alert>
                        <OrderedItemsItem
                          {...item}
                          cssClass="onCooking-item"
                        />
                      </Alert>
                    </Col>
                  ))}
                  {onCookingItemsFetch.length === 0 && <h4 className="text-muted">No dishes are being prepared at the moment.</h4>}
              </Row>
            </Col>
            <Col sm="6">
              <h5>Served Dishes</h5>
              {completedItemsFetch.length > 0 && (
                <Row className="mt-4 ">
                  {completedItemsFetch.map((item: IItem) => (
                    <Col sm="12" lg="6">
                      <Alert variant="success">
                        <OrderedItemsItem
                          key={item.id}
                          {...item}
                          cssClass="completed-item"
                        />
                      </Alert>
                    </Col>
                  ))}
                </Row>
              )}
              {completedItemsFetch.length === 0 && <h4 className="text-muted">No served dishes yet.</h4>}
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default OrderedItemsWidget;
