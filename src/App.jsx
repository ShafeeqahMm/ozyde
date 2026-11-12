import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dresses from "./pages/Dresses";
import DressDetails from "./pages/DressDetails";
import Rent from "./pages/rent";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/dresses/:id" element={<DressDetails />} />
          <Route path="/rent/:id" element={<Rent />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Pages without navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;