import Order from "./Order";
import { Button, Container } from "react-bootstrap";
import cookinggif from "../../public/imgs/cooking.gif";
import see_my_items from "../../public/imgs/see_my_items.svg"
import basket from "../../public/imgs/basket.png";
import { useCartContext } from "../context/UseStateContext";
import OrderedItems from "../components/OrderedItemsWidget/OrderedItemsWidget";
import Footer from "../components/Footer";

const Layout = () => {
  const {
    toggleOrderContainer,
    orderContainer,
    toggleCartContainer,
    cartItems,
    cartQuantity,
    orderedItems,
    onCookingItemsFetch,
    completedItemsFetch,
  } = useCartContext();
  return (
    <div>
      <Order />
      <Container className="g-5 mb-3">
        <div className="cart-btn-div">
        {cartItems.length > 0 && (
          <div
            className="cart-item-counter"
            style={{ position: "fixed", bottom: 100, right: 180 }}
          >
            {cartQuantity}
          </div>
        )}
        <button
          style={{ position: "fixed", bottom: 30, right: 150 }}
          className={`cart-btn basket_btn  ${
            cartItems.length >= 1 ? "active_cart" : ""
          }`} //rounded-circle btn-lg
          onClick={() => {
            toggleCartContainer();
          }}
        >
          <img src={basket} width="50px" height="65px" alt="cooking..." />{" "}
        </button>
        </div>
        

        {(onCookingItemsFetch.length > 0 || completedItemsFetch.length > 0) && (
          <button
            style={{ position: "fixed", bottom: 30, right: 50 }}
            className="ordered-items-btn"
            onClick={() => {
              toggleOrderContainer();
            }}
          >
            <img src={onCookingItemsFetch.length > 0 ? cookinggif : see_my_items} width="50px" height="65px" alt="cooking..." />
          </button>
        )}
      </Container>
      {(onCookingItemsFetch.length > 0 || completedItemsFetch.length > 0) && (
        <OrderedItems />
      )}
      <Footer />
    </div>
  );
};

export default Layout;
