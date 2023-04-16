import { BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import "./plugins";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
export default App;
