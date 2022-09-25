import { Button, Card, Container, Modal } from "react-bootstrap";
import { useCartContext } from "../context/UseStateContext";
import { useState } from "react";

const StoreItem = ({
  product_id,
  product_name,
  product_price,
  product_img,
  product_description,
}) => {
  const [expandItem, setExpandItem] = useState(false);
  const {
    cartItems,
    getItemQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
  } = useCartContext();
  const quantity = getItemQuantity(product_id);
  return (
    <Container>
      <Card key={product_id} className="h-100 shadow">
        <Card.Img
          variant="top"
          src={product_img}
          height="200px"
          onClick={() => setExpandItem(true)}
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{product_name}</span>
            <span className="ms-2 text-muted">{product_price} €</span>
          </Card.Title>
          <p>{product_description}</p>
          <div className="d-flex justify-content-center align-content-center">
            {quantity > 0 ? (
              <>
                <Button
                  className="b-2"
                  onClick={() => decrementQuantity(product_id)}
                >
                  -
                </Button>
                <span className="m-5">{quantity}</span>
                <Button
                  className="b-2"
                  onClick={() => incrementQuantity(product_id)}
                >
                  +
                </Button>
                <Button
                  className="b-2"
                  variant="outline-danger"
                  onClick={() => removeItem(product_id)}
                >
                  &times;
                </Button>
              </>
            ) : (
              <button
                className="btn-primary"
                onClick={() => incrementQuantity(product_id, product_name)}
              >
                {" "}
                + Add to Cart
              </button>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Expand Item */}
      {expandItem && (
        <Container>
          <Modal
            show={expandItem}
            onHide={() => setExpandItem((prev) => !prev)}
            placement="end"
            centered
            dialogClassName="200w"
            className="show-item"
          >
            <Modal.Header closeButton className="show-item-header">
              <div className="show-item-header-content">
                <Modal.Title>{product_name}</Modal.Title>
                <span className="show-item-header-span text-muted">
                  {product_price} €
                </span>
              </div>
            </Modal.Header>
            <Modal.Body className="show-item-body">
              <img
                src={product_img}
                style={{ objectFit: "cover" }}
                className="p-2"
              />
              <p className="m-4">{product_description}</p>
              {quantity > 0 ? (
                <>
                  <Button
                    className="b-2"
                    onClick={() => decrementQuantity(product_id)}
                  >
                    -
                  </Button>
                  <span className="m-5">{quantity}</span>
                  <Button
                    className="b-2"
                    onClick={() => incrementQuantity(product_id)}
                  >
                    +
                  </Button>
                  <Button
                    className="b-2"
                    variant="outline-danger"
                    onClick={() => removeItem(product_id)}
                  >
                    &times;
                  </Button>
                </>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => incrementQuantity(product_id)}
                >
                  {" "}
                  + Add to Cart
                </button>
              )}
            </Modal.Body>
          </Modal>
        </Container>
      )}
      {/* End Expand Item */}
    </Container>
  );
};

export default StoreItem;
