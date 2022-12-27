import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import db from "../firebase/firebaseConfig";
import { IAppContext } from "../types/contextTypes";
import { IItem, IProduct } from "../types/types";

interface AppContextProps {
  children: JSX.Element;
}

const Context = createContext({} as IAppContext);

export const UseLayoutContext = ({ children }: AppContextProps) => {
  const [products, setProducts] = useState<IProduct[]>([]); //Array of available products (filled from database fetch)
  const [orderId, setOrderId] = useState<string>("AQ5495866"); //Contains a string for the order number.
  const [cartContainer, setCartContainer] = useState(false); //Toggles cart container
  const [orderContainer, setOrderContainer] = useState(false); //Toggles orders view container
  //Fetched data of the products that are currently in kitchen.
  const [onCookingItemsFetch, setCookingItemsFetch] = useState<IItem[]>([]);
  //Fetched data of the products that are already served to the client.
  const [completedItemsFetch, setCompletedItemsFetch] = useState<IItem[]>([]);
  const [orderOnCookingTime, setOrderOnCookingTime] = useState(0);


  console.log(orderOnCookingTime)
  //Fetchs datafrom activeOrders and completedOrders.
  useEffect(() => {
    try {
      onSnapshot(doc(db, "activeOrders", orderId), (doc) => {
        if (doc.data()) {
          setCookingItemsFetch(doc.data()!.items);
          setOrderOnCookingTime(doc.data()!.time);
        } else {
          setCookingItemsFetch([]);
          setOrderOnCookingTime(0);
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
          setCompletedItemsFetch(doc.data()!.items);
        } else {
          setCompletedItemsFetch([]);
        }
      });
    } catch (error) {
      alert("Something went wrong, please try again");
      console.error(error);
    }
  }, []);
  const values = {
    cartContainer,
    setCartContainer,
    orderContainer,
    setOrderContainer,
    products,
    setProducts,
    orderId,
    setOrderId,
    onCookingItemsFetch,
    setCookingItemsFetch,
    completedItemsFetch,
    setCompletedItemsFetch,
    orderOnCookingTime,
    setOrderOnCookingTime
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useAppContext = () => {
  return useContext(Context);
};
