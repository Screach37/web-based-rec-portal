import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import HeaderPage from "./Header";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useNavigate } from "react-router-dom";
const UserPersonalProfile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [userdata, setUserData] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const userInfoMethod = async () => {
			if (user.userType == "student") {
				const response = await fetch(`http://https://web-based-rec-portal-phi.vercel.app:4000/user/${user._id}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
				if (response.status == 200) {
					const data = await response.json();
					setUserData(data);
				} else {
					console.log(response);
				}
			} else {
				const response = await fetch(
					`http://https://web-based-rec-portal-phi.vercel.app:4000/company/getCompany/${user._id}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					}
				);
				if (response.status == 200) {
					const data = await response.json();
					setUserData(data);
				} else {
					console.log(response);
				}
			}
		};
		userInfoMethod();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("../login");
		window.location.reload();
	};
	return (
		<>
			<div className="appbar">
				<HeaderPage userdata={userdata} />
			</div>
			<div className="Personal">
				{userdata ? (
					<Card className="PersonalProfile">
						<span>Your Profile</span>
						<div>
							<img
								src="https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png"
								alt=""
							/>
							<span>{userdata.name}</span>
							{user._id == userdata._id && (
								<>
									<Button
										onClick={handleLogout}
										variant="contained"
										style={{
											marginRight: "30px",
											cursor: "pointer",
											color: "white",
										}}
										className="editProfiledetails"
									>
										Logout
									</Button>
									{userdata && userdata.userType != "company" && (
										<ModeEditIcon
											style={{ cursor: "pointer" }}
											onClick={() => navigate(`../user/${user._id}`)}
											className="editProfiledetails"
										/>
									)}
								</>
							)}
						</div>
						<div>
							<div className="eachSection">
								<span>more info</span>
							</div>
							<div className="first">
								<div className="eachSection">
									<EmailIcon />
									<span>{userdata.email}</span>
								</div>
								<div className="eachSection">
									<CallIcon />
									<span>{userdata.mobile}</span>{" "}
								</div>
							</div>
							{userdata.collegeName && (
								<div className="eachSection">
									<SchoolIcon />
									<span>{userdata.collegeName}</span>{" "}
								</div>
							)}
							{userdata.graduationYear && (
								<div className="eachSection">
									<LocalLibraryIcon />
									<span>Graduation year in {userdata.graduationYear}</span>{" "}
								</div>
							)}
							{userdata.skills && (
								<div className="eachSection">
									<LightbulbIcon />
									<span>{userdata.skills}</span>
								</div>
							)}
							{userdata.github && (
								<div className="eachSection">
									<GitHubIcon />
									<span>{userdata.github}</span>
								</div>
							)}
							{userdata.linkedin && (
								<div className="eachSection">
									<LinkedInIcon />
									<span>{userdata.linkedin}</span>
								</div>
							)}
						</div>
					</Card>
				) : (
					"Please wait.Loading Information..."
				)}
			</div>
		</>
	);
};

export default UserPersonalProfile;
