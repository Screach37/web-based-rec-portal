import { Button, Card, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HeaderPage from "./Header";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const JobPostedByCompany = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [alljob, setAllJob] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [userdata, setUserData] = useState(null);
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		const alljobs = async () => {
			const response = await fetch(
				`http://localhost:4000/company/all_job_posted/${user._id}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);
			if (response.status == 200) {
				const data = await response.json();
				setAllJob(data);
			} else {
				console.log(response);
			}
		};

		const userInfoMethod = async () => {
			if (user.userType == "student") {
				const response = await fetch(`http://localhost:4000/user/${user._id}`, {
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
					`http://localhost:4000/company/getCompany/${user._id}`,
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
		alljobs();
		userInfoMethod();
	}, []);

	const handleApplyJob = async (jobId) => {
		const body = {
			userId: user._id,
			jobId: jobId,
		};
		if (user.userType == "company") {
			return setOpen(true);
		}
		const response = await fetch("http://localhost:4000/user/apply_for_job", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (response.status == 200) {
			const data = await response.json();
			setUserData(data);
		} else {
			console.log(response);
		}
	};

	const handleSaveJob = async (jobId) => {
		const body = {
			userId: user._id,
			jobId: jobId,
		};
		if (user.userType == "company") {
			return setOpen(true);
		}
		const response = await fetch("http://localhost:4000/user/save_job", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (response.status == 200) {
			const data = await response.json();
			setUserData(data);
		} else {
			console.log(response);
		}
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const action = (
		<React.Fragment>
			<Button color="secondary" size="small" onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	const localTime = (createdAt) => {
		const date = new Date(createdAt);
		const time = date.toLocaleDateString(undefined, {
			timeZone: "Asia/Kolkata",
		});
		return time;
	};
	return (
		<>
			<div className="HomeClass">
				<div className="appbar">
					<HeaderPage
						userdata={userdata}
						alljob={alljob}
						setAllJob={setAllJob}
					/>
				</div>
				<div className="allContentDiv">
					<div>
						<div onClick={() => navigate("../company/internships")}>
							<WorkIcon />
							<span>Internships</span>
						</div>
						<div onClick={() => navigate("../company/fulltime_jobs")}>
							<WorkHistoryIcon style={{ color: "#89375F" }} />
							<span>FullTime Job</span>
						</div>
					</div>
					<div>
						<div className="searchBox">
							<span className="headingText">
								Our Hiring Post ({" "}
								<span style={{ color: "#537fe7" }}>
									{alljob && alljob.length}
								</span>{" "}
								)
							</span>
						</div>

						{alljob != null && alljob.length > 0
							? alljob.map((job) => {
									return (
										<>
											<Card className="HomeCard">
												<div className="singleCard">
													<img
														src="https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png"
														alt=""
													/>
													<span>{job.companyId.name}</span>
													<span>|</span>
													<span>{localTime(job.createdAt)}</span>
													{userdata && userdata.userType == "company" ? (
														<span
															className="no_of_candidate"
															variant="contained"
															style={{ backgroundColor: "white" }}
															onClick={() => handleApplyJob(job._id)}
														>
															{job.appliedUser.length} Candidates Applied
														</span>
													) : (
														<Button
															className="applybtn"
															variant="contained"
															onClick={() => handleApplyJob(job._id)}
														>
															{userdata &&
															userdata.userType != "company" &&
															userdata.applied.includes(job._id)
																? "Applied"
																: "Apply now"}
														</Button>
													)}
												</div>
												<div>
													<div>
														<div className="titles">
															<span>Job Title</span>
															<span>{job.jobTitle}</span>
														</div>
														<div className="verticalLine"></div>
														<div className="titles">
															<span>No. of vacancy</span>
															<span>{job.Number_of_Vacancy}</span>
														</div>
														<div className="verticalLine"></div>
														<div className="titles">
															<span>Location</span>
															<span>
																{job.location != null && `${job.location}`}
															</span>
														</div>
														<div className="verticalLine"></div>
														<div className="titles">
															<span>Job type</span>
															<span>{job.job_type}</span>
														</div>
													</div>

													<div>
														{job.appliedUser.length > 0 && (
															<Button
																style={{
																	backgroundColor: "#454545",
																	color: "white",
																}}
																className="applybtn"
																variant="contained"
																onClick={() =>
																	navigate(
																		`/company/applied/users/job/${job._id}`
																	)
																}
															>
																View All
															</Button>
														)}
													</div>
												</div>
											</Card>
										</>
									);
							  })
							: "No data"}
					</div>
					<div>
						<Card className="userProfileCard">
							<img
								src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
								alt=""
							/>
							<span>{userdata && userdata.name}</span>

							{userdata && userdata.userType == "student" && (
								<Button
									startIcon={<EditIcon style={{ fontSize: "14px" }} />}
									onClick={() => navigate(`user/${user._id}`)}
									variant="contained"
									className="editBtn"
								>
									Edit Profile
								</Button>
							)}
						</Card>
					</div>
				</div>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Not allowed to the company"
				action={action}
			/>
		</>
	);
};

export default JobPostedByCompany;
