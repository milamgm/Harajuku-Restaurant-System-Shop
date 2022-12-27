import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UseStateContext } from "./context/CartContext";
import Layout from "./pages/Layout";
import Start from "./pages/Start";
import "./styles/styles.css";
import { UseLayoutContext } from "./context/AppContext";

function App() {
  return (
    <UseLayoutContext>
      <UseStateContext>
        <Container>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/start" element={<Start />} />
          </Routes>
        </Container>
      </UseStateContext>
    </UseLayoutContext>
  );
}

export default App;
