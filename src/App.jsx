import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AllRoutes />
    </BrowserRouter>
  );
}

export const baseUrl = "http://localhost:3001/";
export default App;
