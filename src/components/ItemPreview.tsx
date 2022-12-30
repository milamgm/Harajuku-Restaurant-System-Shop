import { Button, Modal, Container } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";
import { TpreviewItem } from "../types/types";

const ItemPreview = ({
  previewItem,
  setPreviewItem,
  product_id,
  product_name,
  product_price,
  product_img,
  product_description,
  quantity,
}: TpreviewItem) => {
  const { incrementQuantity, decrementQuantity, removeItem } = useCartContext();

  return (
    <Container>
      <Modal
        show={previewItem}
        onHide={() => setPreviewItem((prev) => !prev)}
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
            className="p-2 w-100"
          />
          <p className="m-4">{product_description}</p>
          {quantity && quantity > 0 ? (
            <>
              <Button
                className="b-2"
                onClick={() => decrementQuantity(product_id, product_name)}
              >
                -
              </Button>
              <span className="m-5">{quantity}</span>
              <Button
                className="b-2"
                onClick={() => incrementQuantity(product_id, product_name)}
              >
                +
              </Button>
              <Button
                className="b-2"
                variant="outline-danger"
                onClick={() => removeItem(product_id, product_name)}
              >
                &times;
              </Button>
            </>
          ) : (
            <button
              className="btn-primary"
              onClick={() => incrementQuantity(product_id, product_name)}
            >
              + Add to Cart
            </button>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ItemPreview;
