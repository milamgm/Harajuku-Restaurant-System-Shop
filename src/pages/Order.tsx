import NavBar from "../components/NavBar";
import items from "../data/items.json";
import StoreItem from "../components/StoreItem";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import carousel from "../data/carousel.json";
import { HashLink as Link } from "react-router-hash-link";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig"
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useCartContext, UseStateContext } from "../context/UseStateContext";

type items = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  type: string;
};
const Order = () => {
  const {products, setProducts} = useCartContext()
  //Group items array by type (associative)
  const categorizedData = products.reduce((acc, curr) => {
    const { product_id, product_category, product_name, product_price, product_img, product_description } = curr;
    if (!acc[product_category]) {
      acc[product_category] = [];
    }
    acc[product_category].push({
      product_id: product_id,
      product_name: product_name,
      product_price: product_price,
      product_img: product_img,
      product_description: product_description,
    });

    return acc;
  }, []);
console.log(products)
  useEffect(() => {
    onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts([]);
      snapshot.docs.forEach((doc) => {
        setProducts((prevProducts : any) => [...prevProducts, doc.data()]);
      });
    });
  }, []);
  console.log(products)
  return (
    <>
      <NavBar />
      <Container>
        <Carousel fade>
          {carousel.map((item) => (
            <Carousel.Item key={item.title}>
              <img
                className="d-block w-100"
                src={item.imgUrl}
                alt={item.title}
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Button
                  as={Link}
                  size="sm"
                  variant="danger"
                  to={{ pathname: "/", hash: `#${item.title}` }}
                >
                  Go To Item
                </Button>
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
              {categorizedData[key].map((item) => (
                <Container className="mt-5" key={item.product_id} id={item.product_name}>
                  <StoreItem {...item} />
                </Container>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Order;
