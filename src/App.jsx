import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export const baseUrl = ''
export default App;
