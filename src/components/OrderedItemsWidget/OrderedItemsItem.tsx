import { Stack } from "react-bootstrap";
import { useCartContext } from "../../context/UseStateContext";
import items from "../../data/items.json";

const OrderedItemsItem = ({ id, quantity }) => {
  const { products } = useCartContext();
  const item = products.find((item) => item.product_id === id);
  if (item === null) return null;

  return (
    <Stack direction="horizontal" className="g-3 ordered-item">
      <img src={item.product_img} alt={item.product_name} width={100} />
      <span className="me-1">{item.product_name}</span>
      <span className="text-muted"> x {quantity}</span>
    </Stack>
  );
};

export default OrderedItemsItem;
