import { useContext, createContext, useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import settings from "../data/settings.json";
import useLocalStorage from "../hooks/useLocalStorage";
import { setDoc, doc } from "firebase/firestore";
import db from "../firebase/firebaseConfig.js";
import { IItem, IProduct } from "../types/types";
import { useAppContext } from "./AppContext";
import { ICartContext } from "../types/contextTypes";

interface CartContextProps {
  children: JSX.Element;
}

const Context = createContext({} as ICartContext);

//Sets the timer with the minutes provided.
const { waitingTime } = settings[0];

export const UseStateContext = ({ children }: CartContextProps) => {
  const {
    setCartContainer,
    products,
    orderId,
    tableNum,
    onCookingItemsFetch,
    orderOnCookingTime,
  } = useAppContext();

  const [cartItems, setCartItems] = useLocalStorage("cart-items", []); //Products currently in cart.
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
  const intervalRef = useRef<NodeJS.Timer>();

  const date = new Date();

  const cartQuantity = cartItems.reduce((totalQty: number, currItem: IItem) => {
    return totalQty + currItem.quantity;
  }, 0);

  //Adds cart items to the database (table activeOrders); they will be displayed in the kitchen app.
  const sendToKitchen = async () => {
    await setDoc(doc(db, "activeOrders", orderId), {
      order_id: orderId,
      table_num: tableNum,
      time: orderOnCookingTime === 0 ? date.getTime() : orderOnCookingTime,
      items: [...orderedItems],
    });
  };
console.log(orderId)
  //--------------------------------------
  //array that contains the sum of products that have just been sent to kitchen + the products that are already
  //in the kitchen, this array is filled in the function "orderRound" and its necesary for update the "items" field in "activeOrders" table.
  const [orderedItems, setOrderedItems] = useState<IItem[]>([]);
  //Fills orderedItems array, resets cart array
  const orderRound = () => {
    setOrderedItems(() => {
      const initialValueReducer: IItem[] = [];
      return [...cartItems, ...onCookingItemsFetch].reduce((accum, curr) => {
        const repeated = accum.find((item: IItem) => item.id === curr.id);
        if (repeated !== undefined) {
          repeated.quantity += curr.quantity;
          repeated.price += curr.price;
        } else {
          accum.push(curr);
        }
        return accum;
      }, initialValueReducer);
    });
    toast.success(
      `${cartItems.length} product sent to kitchen! Soon they will be served at your table. 😋`,
      { duration: 7000 }
    );
    setCartItems([]);
    setOrderAccepted((prevstate) => !prevstate);
  };
  //--------------------------------------
  // Increments the quantity of a product in the cart or adds it to the cart if this does not exists yet.
  const incrementQuantity = (id: number, name: string) => {
    setCartItems((prevCartItems: IItem[]) => {
      if (prevCartItems.find((item) => item.id === id)?.quantity == null) {
        //Product does not exists in cart yet
        toast.success(`Added ${name} to cart`, {
          duration: 2000,
        });
        if (cartItems.length === 0) {
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
        //Product already exists in cart
        return prevCartItems.map((item) => {
          if (item.id === id) {
            toast.success(`x ${item.quantity + 1} ${item.name}`, { duration: 2000 });
            if (counter.minutes == 0 && counter.seconds < 30) {
              setCounter((prev: { minutes: number; seconds: number }) => ({
                ...prev,
                seconds: prev.seconds + 29,
              }));
            }
            return {
              ...item,
              quantity: item.quantity + 1,
              price:
                products.find((product: IProduct) => product.product_id === id)!
                  .product_price *
                (item.quantity + 1),
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  // Decrements the quantity of a product in the cart or removes it if the quantity is equal to zero.
  const decrementQuantity = (id: number, name: string) => {
    setCartItems((prevCartItems: IItem[]) => {
      const exists = prevCartItems.find((item) => item.id === id);
      if (exists?.quantity == 1) {
        toast.success(`Removed ${exists.name} from cart`, { duration: 2000 });
        return prevCartItems.filter((item) => item.id != id);
      } else {
        return prevCartItems.map((item) => {
          if (item.id === id) {
            toast.success(`x ${item.quantity - 1} ${name}`, { duration: 2000 });
            return {
              ...item,
              quantity: item.quantity - 1,
              price:
                item.price -
                products.find((item) => item.product_id === id)!.product_price,
            };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeItem = (id: number, name: string) => {
    toast.success(`Removed ${name} from cart`, { duration: 2000 });
    setCartItems((prevCartItems: IItem[]) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };

  //Activate Counter and send to Ordered-Items-Widget when finish.
  useEffect(() => {
    if (activeCounter && counter.minutes >= 0 && cartItems.length > 0) {
      intervalRef.current = setInterval(() => {
        setCounter((prev: ICartContext["counter"]) => ({
          ...prev,
          seconds: prev.seconds - 1,
        }));
        if (counter.seconds == 1) {
          setCounter((prev: ICartContext["counter"]) => ({
            ...prev,
            minutes: prev.minutes - 1,
          }));
          setCounter((prev: ICartContext["counter"]) => ({
            ...prev,
            seconds: 59,
          }));
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

  //If orderedItems array changes, calls sendToKitchen function.
  useEffect(() => {
    if (orderedItems.length > 0) {
      sendToKitchen();
    }
  }, [orderedItems]);

  const values = {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    orderAccepted,
    orderedItems,
    cartQuantity,
    counter,
  };

  return (
    <Context.Provider value={values}>
      <div>
        <Toaster
         position="top-right"
          toastOptions={{
            style: {
              background: "#b4e3e1",
            },
            success: {
              style: {
                background: "#b2e6c5",
              },
            },
            error: {
              style: {
                background: "red",
              },
            },
          }}
        />
      </div>
      {children}
    </Context.Provider>
  );
};
export const useCartContext = () => {
  return useContext(Context);
};
