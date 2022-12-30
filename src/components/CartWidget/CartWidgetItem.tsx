import { Alert, Card, Stack } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";
import { useCartContext } from "../../context/CartContext";
import { ICartContext } from "../../types/contextTypes";
import { IProduct } from "../../types/types";

interface CartWidgetItemProps {
  id: number;
  quantity: number;
}

const CartWidgetItem = ({ id, quantity }: CartWidgetItemProps) => {
  const { removeItem, incrementQuantity, decrementQuantity }: ICartContext =
    useCartContext();
  const { products } = useAppContext();
  //Checks the cart to see if the added item already exists.
  const item = products.find((item: IProduct) => item.product_id === id);
  if (item == null) return null;

  return (
    <div className="ms-3 mt-4">
      <Stack direction="horizontal" className="gap-2">
        <img src={item.product_img} alt={item.product_name} width={100} />
        <h4>{item.product_name}</h4>
        <span className="muted-text">
          <h4 className="text-muted"> x {quantity}</h4>
        </span>
      </Stack>
      <div className="btn-area mt-1">
        <button onClick={() => decrementQuantity(id, item.product_name)}>
          -
        </button>
        <span className="m-5">
          {quantity}
        </span>
        <button onClick={() => incrementQuantity(id, item.product_name)}>
          +
        </button>
        <button
          className="danger-btn"
          onClick={() => removeItem(id, item.product_name)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CartWidgetItem;
