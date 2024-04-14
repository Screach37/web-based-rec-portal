import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import "./App.css";
import RegisterPage from "./components/UserRegisterPage";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import FulltimePage from "./components/FulltimePage";
import BookmarkPage from "./components/BookmarkPage";
import AppliedPage from "./components/AppliedPage";
import InternshipPage from "./components/InternshipPage";
import JobPostedByCompany from "./components/JobPostedByCompany";
import AppliedUserPage from "./components/AppliedUserPage";
import UserPersonalProfile from "./components/UserPersonalProfile";
import { Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
const App = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<NotFound />} />{" "}
					<Route
						exact
						path="/"
						element={user ? <HomePage /> : <Navigate to="../login" />}
					/>{" "}
					<Route
						path="/login"
						element={user ? <Navigate to="../" /> : <LoginPage />}
					/>{" "}
					<Route
						path="/register"
						element={user ? <Navigate to="../" /> : <RegisterPage />}
					/>{" "}
					<Route
						path="/company/applied/users/job/:id"
						element={user ? <AppliedUserPage /> : <Navigate to="../login" />}
					/>{" "}
					<Route
						path="/company/internships"
						element={user ? <InternshipPage /> : <Navigate to="../login" />}
					/>{" "}
					<Route
						path="/company/fulltime_jobs"
						element={user ? <FulltimePage /> : <Navigate to="../login" />}
					/>{" "}
					<Route
						path="/company/bookmarks"
						element={user ? <BookmarkPage /> : <Navigate to="../login" />}
					/>{" "}
					<Route
						path="/company/job_post"
						element={user ? <JobPostedByCompany /> : <Navigate to="../login" />}
					/>{" "}
					<Route
						path="/company/applied_for_job"
						element={user ? <AppliedPage /> : <Navigate to="../login" />}
					/>{" "}
					<Route
						path="/user/:id"
						element={user ? <UserProfile /> : <Navigate to="../login" />}
					/>{" "}
					<Route path="/user/profile/:id" element={<UserPersonalProfile />} />{" "}
				</Routes>{" "}
			</BrowserRouter>{" "}
		</>
	);
};

export default App;
