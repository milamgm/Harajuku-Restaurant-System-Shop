import { Container, Navbar, Nav } from "react-bootstrap";
import CartWidget from "./CartWidget/CartWidget";
import { HashLink as Link } from "react-router-hash-link";
import { IProduct } from "../types/types";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const NavBar = () => {
  const { products } = useAppContext();
  const [expanded, setExpanded] = useState(false);

  const handleSelect = () => setExpanded(false);

  //Creates an array with the product categories. Then create a set with it to eliminate duplicates.
  const itemsCategory = new Set<string>(
    products.reduce((categories: string[], product: IProduct) => {
      categories.push(product.product_category);
      //positions drinks and desserts at the end of the array
      categories.sort((a, b) => {
        if (a.includes("Dessert") || a.includes("Drink")) {
          return 1;
        }
        if (b.includes("Dessert") || b.includes("Drink")) {
          return -1;
        }
        return 0;
      });
      return categories;
    }, [])
  );

  return (
    <Navbar
      sticky="top"
      className="bg-white shadow-sm mb-3 ps-3 pe-3"
      expand="md"
      expanded={expanded}
    >
      <div className="logo">Harajuku </div>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded((prev) => !prev)}
      />
      <Navbar.Collapse id="basic-navbar-nav" onSelect={handleSelect}>
        <Container>
          <Nav className="me-auto justify-content-center">
            {[...itemsCategory].map((category) => (
              <Nav.Link
                as={Link}
                key={category}
                to={{ pathname: "/", hash: `#${category}` }}
                onClick={() => setExpanded(false)}
              >
                {category}
              </Nav.Link>
            ))}
          </Nav>
          <CartWidget />
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
