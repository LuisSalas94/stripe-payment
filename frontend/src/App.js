import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Login from "./components/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ToastContainer />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout-success" element={<CheckoutSuccess />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
