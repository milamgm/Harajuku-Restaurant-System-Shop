import { Button, Stack } from "react-bootstrap";
import { useCartContext } from "../../context/UseStateContext";

interface CartWidgetItemProps {
  id: number;
  quantity: number;
}

const CartWidgetItem = ({ id, quantity } : CartWidgetItemProps) => {
  const { removeItem, incrementQuantity, decrementQuantity, products } =
    useCartContext();

  //Checks the cart to see if the added item already exists.
  const item = products.find((item) => item.product_id === id);
  if (item == null) return null;

  return (
    <>
      <Stack direction="horizontal" className="gap-2">
        <img src={item.product_img} alt={item.product_name} width={100} />
        <h4>{item.product_name}</h4>
        <span className="muted-text"> x {quantity}</span>
      </Stack>
      <div>
        <button
          className="b-2 btn-primary"
          onClick={() => decrementQuantity(id)}
        >
          -
        </button>
        <span className="m-5">{quantity}</span>
        <button
          className="b-2 btn-primary"
          onClick={() => incrementQuantity(id)}
        >
          +
        </button>
        <button className="btn-danger" onClick={() => removeItem(id)}>
          &times;
        </button>
      </div>
    </>
  );
};

export default CartWidgetItem;
