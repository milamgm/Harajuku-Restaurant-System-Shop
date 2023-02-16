import NavBar from "../components/NavBar";
import StoreItem from "../components/StoreItem";
import { Container, Row, Carousel } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { ICarouselProduct, IProduct } from "../types/types";
import AppDemoModal from "../zz__demo__modal/AppDemoModal";

type categorizedDataAcumProps = {
  [key: string]: IProduct[];
};

const Order = () => {
  const { products, setProducts, openDemoModal, setOpenDemoModal } =
    useAppContext();
  const [carouselProducts, setCarouselProducts] = useState<ICarouselProduct[]>(
    []
  );
  //Group items by type in an array (associative) to display them.
  const categorizedData = products.reduce(
    (acc: categorizedDataAcumProps[] | [], curr) => {
      const { product_category } = curr;
      if (!acc[product_category]) {
        acc[product_category] = [];
      }
      acc[product_category].push(
        Object.fromEntries(
          Object.entries(curr).filter(
            (key) => !key.includes("product_category")
          )
        )
      );
      //positions drinks and desserts at the end of the array
      const keys = Object.keys(acc);
      keys.sort((a, b) => {
        if (a.includes("Dessert") || a.includes("Drink")) {
          return 1;
        }
        if (b.includes("Dessert") || b.includes("Drink")) {
          return -1;
        }
        return 0;
      });
      const sortedProducts: categorizedDataAcumProps[] = [];
      keys.forEach((key) => {
        sortedProducts[key] = acc[key];
      });
      return sortedProducts;
    },
    []
  );

  //Fetching Products from database and getting 3 random products to display in carousel.
  useEffect(() => {
    onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts([]);
      snapshot.docs.forEach((doc) => {
        const product = doc.data() as IProduct;
        setProducts((prevProducts: IProduct[]) => [...prevProducts, product]);
      });
      const carouselArr: ICarouselProduct[] = [];
      while (carouselArr.length < 3) {
        const randomProduct =
          snapshot.docs[
            Math.floor(Math.random() * snapshot.docs.length + 1)
          ].data();
        if (
          !carouselArr.find(
            (product) => product.product_name === randomProduct.product_name
          )
        ) {
          carouselArr.push({
            product_name: randomProduct.product_name,
            product_img: randomProduct.product_img,
            product_description: randomProduct.product_description,
          });
        }
      }
      setCarouselProducts(carouselArr);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Carousel fade>
          {carouselProducts.map((item) => (
            <Carousel.Item key={item.product_name}>
              <div className="carousel_background d-flex justify-content-center mh-25">
                <img
                  className="d-block"
                  src={item.product_img}
                  alt={item.product_name}
                />
              </div>

              <Carousel.Caption>
                <h3>{item.product_name}</h3>
                <p>{item.product_description}</p>
                <button>
                  <a href={`#${item.product_name}`}>Go To Item</a>
                </button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container className="mt-5">
        {Object.keys(categorizedData).map((key) => (
          <div key={key} className="pt-5" id={key}>
            <h1 className="m-4 text-center">{key}</h1>
            <Row md={1} xs={1} lg={2} xl={3} className="g-3">
              {categorizedData[key].map((product: IProduct) => (
                <Container
                  className="mt-5"
                  key={product.product_id}
                  id={product.product_name}
                >
                  <StoreItem product={product} />
                </Container>
              ))}
            </Row>
          </div>
        ))}
      </Container>
      <AppDemoModal
        openDemoModal={openDemoModal}
        setOpenDemoModal={setOpenDemoModal}
      />
    </>
  );
};

export default Order;
