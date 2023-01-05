import { Container, Navbar, Nav } from "react-bootstrap";
import CartWidget from "./CartWidget/CartWidget";
import { HashLink as Link } from "react-router-hash-link";
import { IProduct } from "../types/types";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {
  const { products } = useAppContext();

  //Creates an array with the product categories. Then create a set with it to eliminate duplicates.
  const itemsCategory = new Set<string>(
    products.reduce((categories: string[], product: IProduct) => {
      categories.push(product.product_category);
      //positions drinks and desserts at the end of the array
      categories.sort((a, b) => {
        if (a.includes('Dessert') || a.includes('Drink')) {
          return 1;
        }
        if (b.includes('Dessert') || b.includes('Drink')) {
          return -1;
        }
        return 0;
      });
      return categories;
    }, [])
  );

  return (
    <>
      <Navbar sticky="top" className="bg-white shadow-sm mb-3 ps-3 pe-3">
        <div className="logo">H<span>arajuku</span> </div>
        <Container className="d-flex aligns-items-center justify-content-center">
          <Nav>
            {[...itemsCategory].map((category) => (
              <Nav.Link
                as={Link}
                key={category}
                to={{ pathname: "/", hash: `#${category}` }}
              >
                {category}
              </Nav.Link>
            ))}
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
