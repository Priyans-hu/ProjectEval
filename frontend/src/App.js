import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AssignMarks from "./pages/AssignMarks";
import UserSelectionPage from "./pages/UserSelectionPage";

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditSelectedStudentPage from "./pages/EditSelectedStudentPage";
import AddNewStudentPage from "./pages/AddNewStudentPage";

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<div className='min-h-[88vh]'>
					<Routes>
						<Route path="/" element={<UserSelectionPage />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/edit" element={<EditSelectedStudentPage />} />
						<Route path="/addNew" element={<AddNewStudentPage />} />
						<Route path="/assign/:userId" element={<AssignMarks />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
