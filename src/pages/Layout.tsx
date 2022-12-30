import Order from "./Order";
import { Container } from "react-bootstrap";
import cookinggif from "../../public/imgs/cooking.gif";
import see_my_items from "../../public/imgs/orders.png";
import basket from "../../public/imgs/basket.png";
import { useCartContext } from "../context/CartContext";
import OrderedItems from "../components/OrderedItemsWidget/OrderedItemsWidget";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";

const Layout = () => {
  const { cartItems, cartQuantity } = useCartContext();
  const {
    setOrderContainer,
    setCartContainer,
    onCookingItemsFetch,
    completedItemsFetch,
    setOpenDemoModal,
  } = useAppContext();

  return (
    <div>
      <Order />
      <Container className=" g-5 mb-3">
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
            className={`cart-btn basket_btn layout-btn  ${
              cartItems.length >= 1 ? "active_cart" : ""
            }`} //rounded-circle btn-lg
            onClick={() => {
              setCartContainer((prev) => !prev);
            }}
          >
            <img src={basket} width="50px" height="65px" alt="cooking..." />{" "}
          </button>
        </div>

        {(onCookingItemsFetch.length > 0 || completedItemsFetch.length > 0) && (
          <button
            style={{ position: "fixed", bottom: 30, right: 50 }}
            className="ordered-items-btn layout-btn"
            onClick={() => setOrderContainer((prev) => !prev)}
          >
            <img
              src={onCookingItemsFetch.length > 0 ? cookinggif : see_my_items}
              width="50px"
              height="65px"
              alt="cooking..."
            />
          </button>
        )}
      </Container>
      {(onCookingItemsFetch.length > 0 || completedItemsFetch.length > 0) && (
        <OrderedItems />
      )}
      <div
        role="button"
        className="reset-demo-btn"
        onClick={() => setOpenDemoModal((prev) => !prev)}
      >
        Reset Demo
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
