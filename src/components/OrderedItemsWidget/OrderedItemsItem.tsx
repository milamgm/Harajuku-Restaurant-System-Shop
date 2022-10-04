import { Stack } from "react-bootstrap";
import { useCartContext } from "../../context/UseStateContext";
import items from "../../data/items.json";

const OrderedItemsItem = ({ id, quantity, cssClass }) => {
  const { products } = useCartContext();
  const item = products.find((item) => item.product_id === id);
  if (item === null) return null;

  return (
    <Stack direction="horizontal" className={`g-3 ${cssClass} d-flex justify-content-between me-5`}>
      <img src={item.product_img} alt={item.product_name} width={100} />
      <span className="me-1">{item.product_name}</span>
      <span> x {quantity}</span>
    </Stack>
  );
};

export default OrderedItemsItem;
