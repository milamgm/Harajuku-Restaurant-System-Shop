import { useContext, createContext, useState, useEffect, useRef } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";
import settings from "../data/settings.json";
import useLocalStorage from "../hooks/useLocalStorage";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig.js";
import { itemProps } from "../types/types";

interface UseStateContextProps {
  children: JSX.Element;
}

const Context = createContext({});

//Sets the timer with the minutes provided.
const { waitingTime } = settings[0];

export const UseStateContext = ({ children }: UseStateContextProps) => {
  const [products, setProducts] = useState([]); //Array of available products (from database)
  const [orderId, setOrderId] = useState("AQ5495886"); //Contains a string for the order number.
  const [cartItems, setCartItems] = useLocalStorage("cart-items", []); //Products currently in cart.
  const [cartContainer, setCartContainer] = useState(false); //Toggles cart container
  const [orderContainer, setOrderContainer] = useState(false);//Toggles orders view container
  const [orderAccepted, setOrderAccepted] = useState(false); //Boolean that is true when the products in cart had been sent to kitchen.
  
  //Handles the minutes remaining before the products in the cart are automatically sent to the kitchen. (The minuts are specifyed)
  const [counter, setCounter] = useLocalStorage("counter", {
    minutes: Math.floor(waitingTime / 60),
    seconds: Math.floor(waitingTime % 60),
  });
  //If the cart contains any item, activeCounter will be set to true.
  const [activeCounter, setActiveCounter] = useLocalStorage(
    "active-counter",
    cartItems.length > 0 ? true : false
  );
  const intervalRef = useRef();

  //Fetched data of the products that are currently in kitchen.
  const [onCookingItemsFetch, setCookingItemsFetch] = useState([]);
    //Fetched data of the products that are already served to the client. 
  const [completedItemsFetch, setCompletedItemsFetch] = useState([]);

  
  const [orderedItems, setOrderedItems] = useState<itemProps[]>([]);
  const date = new Date();
  const [orderOnCookingTime, setOrderOnCookingTime] = useState("");
  const [tableNum, setTableNum] = useLocalStorage("table_num", 0);
  const cartQuantity = cartItems.reduce(
    (totalQty: number, currItem: itemProps) => {
      return totalQty + currItem.quantity;
    },
    0
  );

  //Adds items in the cart to the database; they will be displayed in the kitchen app.
  const sendToKitchen = async () => {
    await setDoc(doc(db, "activeOrders", orderId), {
      order_id: orderId,
      table_num: tableNum,
      time: orderOnCookingTime === "" ? date.getTime() : orderOnCookingTime,
      items: [...orderedItems],
    });
  };

  //CartItems to OrderedItems
  const orderRound = () => {
    console.log("fjhdskuhfudhsufhi");
    setOrderedItems((prevOrderedItems) => {
      const q = [...onCookingItemsFetch, ...cartItems];
      const dupli = q.reduce((accum, curr) => {
        const exists = accum.find((elem) => elem.id === curr.id);
        if (exists) {
          return accum.map((elem) => {
            if (elem.id === curr.id) {
              return {
                ...elem,
                quantity: elem.quantity + curr.quantity,
                price: elem.price + curr.price,
              };
            }
            return elem;
          });
        }
        return [...accum, curr];
      }, []);
      return dupli;
    });
    setCartItems([]);
    setOrderAccepted((prevstate) => !prevstate);
  };

  console.log(cartItems);
  const incrementQuantity = (id: number, name: string) => {
    setCartItems((prevCartItems) => {
      if (prevCartItems.find((item) => item.id === id)?.quantity == null) {
        toast(
          `Added ${
            products.find((item) => item.product_id === id)?.product_name
          } to cart`,
          {
            duration: 1000,
          }
        );
        if (cartItems.length == 0) {
          setActiveCounter(true);
        }
        setCartContainer(false);
        return [
          ...prevCartItems,
          {
            id: id,
            name: name,
            quantity: 1,
            price: products.find((item) => item.product_id === id)
              ?.product_price,
          },
        ];
      } else {
       
        return prevCartItems.map((item) => {
          if (item.id === id) {
            toast(
              `x ${item.quantity + 1} ${
                products.find((item) => item.product_id === id)?.product_name
              }`,
              { duration: 1000 }
            );
            if (counter.minutes == 0 && counter.seconds < 30) {
              setCounter((prev) => ({ ...prev, seconds: prev.seconds + 29 }));
            }
            return {
              ...item,
              quantity: item.quantity + 1,
              price:
                products.find((item) => item.product_id === id)?.product_price *
                (item.quantity + 1),
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decrementQuantity = (id: number) => {
    setCartItems((prevCartItems) => {
      if (prevCartItems.find((item) => item.id === id)?.quantity == 1) {
        toast(
          `Removed ${
            products.find((item) => item.product_id === id)?.product_name
          } from cart`,
          { duration: 1000 }
        );
        return prevCartItems.filter((item) => item.id != id);
      } else {
        return prevCartItems.map((item) => {
          if (item.id === id) {
            toast(
              `x ${item.quantity - 1} ${
                products.find((item) => item.product_id === id)?.product_name
              }`,
              { duration: 1000 }
            );
            return {
              ...item,
              quantity: item.quantity - 1,
              price:
                item.price -
                products.find((item) => item.product_id === id)?.product_price,
            };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeItem = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };
  //Container Togglers
  const toggleCartContainer = () => {
    setCartContainer((prevCartcontainer) => !prevCartcontainer);
  };
  const toggleOrderContainer = () => {
    setOrderContainer((prev) => !prev);
  };
  console.log(orderOnCookingTime);
  //Activate Counter and send to Ordered-Items-Widget when finish
  useEffect(() => {
    if (activeCounter && counter.minutes >= 0 && cartItems.length > 0) {
      intervalRef.current = setInterval(() => {
        setCounter((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
        if (counter.seconds == 1) {
          setCounter((prev) => ({ ...prev, minutes: prev.minutes - 1 }));
          setCounter((prev) => ({ ...prev, seconds: 59 }));
        }
      }, 1000);
    } else if (cartItems.length > 0) {
      orderRound();
      setCounter({
        minutes: Math.floor(waitingTime / 60),
        seconds: Math.floor(waitingTime % 60),
      });
      setActiveCounter(false);
    } else if (cartItems.length <= 0) {
      setCounter({
        minutes: Math.floor(waitingTime / 60),
        seconds: Math.floor(waitingTime % 60),
      });
      setActiveCounter(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [activeCounter, counter.seconds]);
  useEffect(() => {
    if (orderedItems.length > 0) {
      sendToKitchen();
    }
  }, [orderedItems]);

  useEffect(() => {
    try {
      onSnapshot(doc(db, "activeOrders", orderId), (doc) => {
        if (doc.data()) {
          setCookingItemsFetch([]);
          setCookingItemsFetch(doc.data().items);
          setOrderOnCookingTime(doc.data().time);
        } else {
          setCookingItemsFetch([]);
          setOrderOnCookingTime("");
        }
      });
    } catch (error) {
      alert("Something went wrong, please try again");
      console.error(error);
    }
  }, []);
  useEffect(() => {
    try {
      onSnapshot(doc(db, "completedOrders", orderId), (doc) => {
        if (doc.data()) {
          setCompletedItemsFetch([]);
          setCompletedItemsFetch(doc.data().items);
        } else {
          setCompletedItemsFetch([]);
        }
      });
    } catch (error) {
      alert("Something went wrong, please try again");
      console.error(error);
    }
  }, []);
  return (
    <Context.Provider
      value={{
        cartItems,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        toggleCartContainer,
        cartContainer,
        orderAccepted,
        orderRound,
        orderContainer,
        setOrderContainer,
        toggleOrderContainer,
        orderedItems,
        cartQuantity,
        setCounter,
        counter,
        setTableNum,
        onCookingItemsFetch,
        completedItemsFetch,
        products,
        setProducts,
      }}
    >
      <div>
        <Toaster />
      </div>
      {children}
    </Context.Provider>
  );
};
export const useCartContext = () => {
  return useContext(Context);
};
