import { Button, Card, Container, Modal } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";
import { useState } from "react";
import { IItem, IProduct } from "../types/types";
import ItemPreview from "./ItemPreview";

type pickFromIproduct = Pick<
  IProduct,
  | "product_id"
  | "product_name"
  | "product_price"
  | "product_img"
  | "product_description"
>;

type StoreItemProps = {
  product: pickFromIproduct;
};

const StoreItem = ({ product }: StoreItemProps) => {
  const {
    product_id,
    product_name,
    product_price,
    product_img,
    product_description,
  } = product;
  const [previewItem, setPreviewItem] = useState(false);
  const { cartItems, incrementQuantity, decrementQuantity, removeItem } =
    useCartContext();

  //Takes the quantity of the item if this exists in the cart.
  const quantity =
    cartItems.find((item: IItem) => item.id === product_id)?.quantity || null;

  return (
    <Container>
      <Card key={product_id} className="h-100 shadow">
        <Card.Img
          variant="top"
          src={product_img}
          height="200px"
          onClick={() => setPreviewItem(true)}
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{product_name}</span>
            <span className="ms-2 text-muted">{product_price} €</span>
          </Card.Title>
          <p>{product_description}</p>
          <div className="d-flex justify-content-center align-content-center">
            {quantity && quantity > 0 && (
                 <div className="btn-area mt-1">
                 <button onClick={() => decrementQuantity(product_id, product_name)}>
                   -
                 </button>
                 <span className="m-5">
                   {quantity}
                 </span>
                 <button onClick={() => incrementQuantity(product_id, product_name)}>
                   +
                 </button>
                 <button
                   className="danger-btn"
                   onClick={() => removeItem(product_id, product_name)}
                 >
                   &times;
                 </button>
               </div>
            )}

            {quantity === null && (
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

      {/* Preview Item Modal*/}
      <ItemPreview
        previewItem={previewItem}
        setPreviewItem={setPreviewItem}
        quantity={quantity}
        {...product}
      />
    </Container>
  );
};

export default StoreItem;
