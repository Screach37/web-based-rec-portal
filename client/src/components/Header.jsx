import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import CreateJob from "./CreateJob";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
const HeaderPage = ({ userdata, alljob, setAllJob }) => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));
	const [open, setOpen] = useState(false);
	return (
		<>
			<img
				onClick={() => navigate("../")}
				style={{ cursor: "pointer" }}
				src="https://cdn.logo.com/hotlink-ok/logo-social.png"
				alt=""
			/>
			<div>
				<div
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}
					className="headerIcon"
				>
					<HomeIcon />
					<span>Home</span>
				</div>
				{userdata &&
					userdata != null &&
					userdata != undefined &&
					userdata.userType == "company" && (
						<div
							onClick={() => navigate("/company/job_post")}
							style={{ cursor: "pointer" }}
							className="headerIcon"
						>
							<DownloadDoneIcon />
							<span>Job Posted</span>
						</div>
					)}
				{userdata &&
					userdata != null &&
					userdata != undefined &&
					userdata.userType == "company" && (
						<div
							style={{ cursor: "pointer" }}
							className="headerIcon"
							onClick={() => setOpen(true)}
						>
							<WorkIcon />
							<span>Create Job</span>
						</div>
					)}

				<div className="userHeader">
					<span>{userdata && userdata.username}</span>
					<img
						style={{ cursor: "pointer" }}
						onClick={() => navigate(`../user/profile/${user._id}`)}
						src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
						alt=""
					/>
				</div>
			</div>
			{open && (
				<CreateJob
					open={open}
					alljob={alljob}
					setOpen={setOpen}
					setAllJob={setAllJob}
				/>
			)}
		</>
	);
};

export default HeaderPage;
