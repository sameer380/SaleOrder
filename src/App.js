
import "./App.css";


import SaleOrderManagement from "./Pages/SaleOrderManagement";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpForm from "./components/Signup";

function App() {
	return (
		
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignUpForm />} />
				<Route path="/OrderPages" element={<SaleOrderManagement/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
