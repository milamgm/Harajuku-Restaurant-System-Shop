import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import db from "../firebase/firebaseConfig";
import useLocalStorage from "../hooks/useLocalStorage";
import { IAppContext } from "../types/contextTypes";
import { IItem, IProduct } from "../types/types";

interface AppContextProps {
  children: JSX.Element;
}

const Context = createContext({} as IAppContext);

export const UseLayoutContext = ({ children }: AppContextProps) => {
  const [products, setProducts] = useState<IProduct[]>([]); //Array of available products (filled from database fetch)
  const [tableNum, setTableNum] = useLocalStorage("table_num", 0); //Table number.
  const [cartContainer, setCartContainer] = useState(false); //Toggles cart container
  const [orderContainer, setOrderContainer] = useState(false); //Toggles orders view container
  //Fetched data of the products that are currently in kitchen.
  const [onCookingItemsFetch, setCookingItemsFetch] = useState<IItem[]>([]);
  //Fetched data of the products that are already served to the client.
  const [completedItemsFetch, setCompletedItemsFetch] = useState<IItem[]>([]);
  const [orderOnCookingTime, setOrderOnCookingTime] = useState(0);

  const [orderId, setOrderId] = useLocalStorage<string>("orderID", ""); //Contains a string for the order number.
  const [openDemoModal, setOpenDemoModal] = useState(true);

  //Checks if a curtomer is in ordering process. (If not, the wellcome demo modal will be displayed and a new order id will be created)
  useEffect(() => {
    let cartItems;
    try {
      cartItems = JSON.parse(
        localStorage.getItem("cartItems") || String([])
      );
    } catch (error) {
      cartItems = [];
    }
    if (
      orderId !== "" ||
      cartItems.length != 0 ||
      onCookingItemsFetch.length > 0 ||
      completedItemsFetch.length > 0
    ) {
      setOpenDemoModal(false);
    } else {
      setOpenDemoModal(true);
    }
  }, []);

  //Fetchs datafrom activeOrders and completedOrders.
  useEffect(() => {
    if (orderId !== "") {
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
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId !== "") {
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
    }
  }, [orderId]);
  
  const values = {
    cartContainer,
    setCartContainer,
    orderContainer,
    setOrderContainer,
    products,
    setProducts,
    orderId,
    setOrderId,
    tableNum,
    setTableNum,
    onCookingItemsFetch,
    setCookingItemsFetch,
    completedItemsFetch,
    setCompletedItemsFetch,
    orderOnCookingTime,
    setOrderOnCookingTime,
    openDemoModal,
    setOpenDemoModal,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useAppContext = () => {
  return useContext(Context);
};
