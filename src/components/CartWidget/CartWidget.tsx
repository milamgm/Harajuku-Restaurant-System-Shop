import { Alert, Modal } from "react-bootstrap";
import { useCartContext } from "../../context/UseStateContext";
import CartWidgetItem from "./CartWidgetItem";
import { GiCheckMark } from "react-icons/gi";
import { itemProps, onCookingItemsFetchProps } from "../../types/types";

const CartWidget = () => {
  const {
    cartContainer,
    toggleCartContainer,
    cartItems,
    counter,
    orderedItems,
    onCookingItemsFetch,
  } = useCartContext();


  //Counts the items that are currently being prepared, for showing it in an Alert
  const totalOrderedItems = onCookingItemsFetch.reduce(
    (total: number, curr: onCookingItemsFetchProps) => {
      return total + curr.quantity;
    },
    0
  );

  return (
    <Modal
      show={cartContainer}
      onHide={() => toggleCartContainer()}
      placement="end"
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {onCookingItemsFetch.length > 0 && (
          <Alert variant="success">
            <GiCheckMark /> {totalOrderedItems} items are being prepared.
          </Alert>
        )}
        {cartItems.length > 0 && (
          <h5>
            This order will be prepaired in {counter.minutes} :
            {counter.seconds < 10 ? `0${counter.seconds}` : counter.seconds}
            minutes.
          </h5>
        )}
        {cartItems.length > 0 &&
          cartItems.map((item: itemProps) => (
            <CartWidgetItem key={item.id} {...item} />
          ))}
        {cartItems.length == 0 && (
          <h5 className="text-muted">
            <i>Your cart is empty, add some fresh food here!</i>
          </h5>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CartWidget;
