import { Routes, Route } from "react-router-dom";
import { UseStateContext } from "./context/CartContext";
import Layout from "./pages/Layout";

import { UseLayoutContext } from "./context/AppContext";

function App() {
  return (
    <UseLayoutContext>
      <UseStateContext>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </UseStateContext>
    </UseLayoutContext>
  );
}

export default App;
