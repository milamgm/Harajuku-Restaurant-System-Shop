import { Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UseStateContext } from "./context/UseStateContext";
import Layout from "./pages/Layout";
import Start from "./pages/Start";
import "./styles/styles.css";


function App() {

  return (
    <UseStateContext>
      <Container>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/start" element={<Start />} />
        </Routes>
      </Container>
    </UseStateContext>
  );
}

export default App;
