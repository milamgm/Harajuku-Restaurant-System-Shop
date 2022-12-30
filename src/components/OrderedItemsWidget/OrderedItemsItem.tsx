import { Stack } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";
import { IProduct } from "../../types/types";

interface OrderedItemsItemProps {
  id: number;
  quantity: number;
  cssClass: String;
}

const OrderedItemsItem = ({ id, quantity, cssClass } : OrderedItemsItemProps) => {
  const { products } = useAppContext();

  //Searchs the item in the products array to display information about it.
  const item = products.find((item : IProduct) => item.product_id === id);
  if (item === null) return null;

  return (
    <Stack
      direction="horizontal"
      className={`g-3 ${cssClass} d-flex justify-content-between me-5`}
    >
      <img className="me-2" src={item!.product_img} alt={item!.product_name} width={50} />
      <span className="me-1">{item!.product_name}</span>
      <span> x {quantity}</span>
    </Stack>
  );
};

export default OrderedItemsItem;
