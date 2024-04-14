import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import HeaderPage from "./Header";
import { useNavigate, useParams } from "react-router-dom";
const AppliedUserPage = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [userdata, setUserData] = useState([]);
	const [data, setData] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const userInfoMethod = async () => {
			const response = await fetch(
				`http://https://web-based-rec-portal-phi.vercel.app:4000/company/getapplied_job/${id}`,
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
		};

		const getData = async () => {
			if (user.userType == "student") {
				const response = await fetch(`http://https://web-based-rec-portal-phi.vercel.app:4000/user/${user._id}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
				if (response.status == 200) {
					const data = await response.json();
					setData(data);
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
					setData(data);
				} else {
					console.log(response);
				}
			}
		};
		userInfoMethod();
		getData();
	}, []);

	const localTime = (createdAt) => {
		const date = new Date(createdAt);
		const time = date.toLocaleDateString(undefined, {
			timeZone: "Asia/Kolkata",
		});
		return time;
	};
	return (
		<>
			<div className="appbar">
				<HeaderPage userdata={data} />
			</div>{" "}
			<div className="AppliedUserDiv">
				<div>
					<span>
						{userdata &&
							userdata.companyId != undefined &&
							userdata.companyId != null &&
							userdata.companyId.name}
					</span>
					<span>Applied for {userdata && userdata.jobTitle}</span>
					<span>
						Total{" "}
						{userdata.appliedUser &&
							userdata.appliedUser != undefined &&
							userdata.appliedUser != null &&
							userdata.appliedUser.length}{" "}
						candidates applied{" "}
					</span>
				</div>
				<div>
					<span className="appliedText">Applied candidates</span>
				</div>
				{userdata.appliedUser &&
				userdata.appliedUser != undefined &&
				userdata.appliedUser != null &&
				userdata.appliedUser.length > 0
					? userdata.appliedUser.map((user) => {
							return (
								<>
									<Card className="AppliedUserCard">
										<div>
											<img
												src="https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png"
												alt=""
											/>{" "}
											<span>{user.name}</span>
											<span style={{ marginTop: "10px" }}>|</span>
											<span>{localTime(user.createdAt)}</span>
											{user.resume ? (
												<>
													<Button
														onClick={() => window.open(user.resume, "_blank")}
														className="ResumeDownload"
														variant="contained"
													>
														Open Resume
													</Button>
												</>
											) : (
												<span
													style={{ color: "red" }}
													className="ResumeDownload"
												>
													Not uploaded
												</span>
											)}
										</div>
									</Card>
								</>
							);
					  })
					: "Loading data"}
			</div>
		</>
	);
};

export default AppliedUserPage;
