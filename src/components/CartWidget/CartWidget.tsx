import { Alert, Modal } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import CartWidgetItem from "./CartWidgetItem";
import { GiCheckMark } from "react-icons/gi";
import { IItem, IOnCookingItemsFetch } from "../../types/types";
import { useAppContext } from "../../context/AppContext";
import { IAppContext, ICartContext } from "../../types/contextTypes";

const CartWidget = () => {
  const { cartItems, counter }: ICartContext = useCartContext();
  const { cartContainer, setCartContainer, onCookingItemsFetch }: IAppContext =
    useAppContext();

  //Counts the items that are currently being prepared, for showing it in an Alert
  const totalOrderedItems = onCookingItemsFetch.reduce(
    (total: number, curr: IOnCookingItemsFetch) => {
      return total + curr.quantity;
    },
    0
  );

  return (
    <Modal
      show={cartContainer}
      onHide={() => setCartContainer((prev: boolean) => !prev)}
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
            This order will be sent to kitchen in {counter.minutes} :
            {counter.seconds < 10
              ? ` 0${counter.seconds}`
              : ` ${counter.seconds}`}{" "}
            minutes.
          </h5>
        )}
        {cartItems.length > 0 &&
          cartItems.map((item: IItem) => (
            <CartWidgetItem key={item.id} {...item} />
          ))}
        {cartItems.length == 0 && (
          <h5 className="text-muted">
            <i>Your cart is empty, add some dishes here.</i>
          </h5>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CartWidget;
