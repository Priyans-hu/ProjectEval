import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AssignMarks from "./pages/AssignMarks";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/assign" element={<AssignMarks />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
