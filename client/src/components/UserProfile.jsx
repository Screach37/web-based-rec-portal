import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import HeaderPage from "./Header";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const UserProfile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [pdffile, setPdfFile] = useState(null);
	const [userdata, setUserData] = useState({});
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		const userInfoMethod = async (req, res) => {
			const response = await fetch(`http://localhost:4000/user/${user._id}`, {
				method: "GET",
				headers: { "Content-type": "application/json" },
			});
			if (response.status == 200) {
				const data = await response.json();
				setUserInfo(data);
				setUserData(data);
			} else {
				console.log(response);
			}
		};

		userInfoMethod();
	}, []);

	const handleChange = (e) => {
		if (e.target.name == "resume") {
			setPdfFile(e.target.files[0]);
			setUserData({ ...userdata, [e.target.name]: "resume field" });
		} else {
			setUserData({ ...userdata, [e.target.name]: e.target.value });
		}
	};
	const handleSubmit = async () => {
		setLoading(true);
		let url;
		if (pdffile) {
			const formData = new FormData();
			formData.append("file", pdffile);

			const response = await fetch("http://localhost:4000/upload/upload_pdf", {
				method: "POST",
				body: formData,
			});
			if (response.status === 201) {
				const data = await response.json();
				console.log(typeof data.url);
				url = data.url;
			} else {
				throw new Error("Failed to upload image");
			}
		}
		if (userdata.resume) {
			userdata.resume = url;
		} else {
			console.log("Not exist resume field", userdata.resume);
		}
		console.log("userdata", userdata);
		const response = await fetch(
			`http://localhost:4000/user/updateProfile/${user._id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userdata),
			}
		);
		if (response.status === 200) {
			const data = await response.json();
			setUserData(data);
			console.log(data);
			setOpen(true);
		} else {
			console.log(response);
		}

		setLoading(false);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const action = (
		<React.Fragment>
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
	return (
		<>
			<div className="appbar">
				<HeaderPage userdata={userInfo} />
			</div>
			<div className="UpdateProfileClass">
				<div className="UpdateProfile">
					<span>Update your profile</span>
					<span>Q. Your full name ?*</span>
					<input
						value={userdata.name || " "}
						type="text"
						placeholder="Name"
						onChange={handleChange}
						name="name"
					/>
					<span>Q. Your Email address ?*</span>
					<input
						value={userdata.email || ""}
						type="text"
						disabled={true}
						placeholder="Email"
						name="email"
					/>
					<span>Q. Your mobile number ?*</span>
					<input
						value={userdata.mobile || ""}
						type="text"
						placeholder="Mobile"
						onChange={handleChange}
						name="mobile"
					/>
					<span>Q. Which domain are you interested in working?</span>
					<input
						type="text"
						name="skills"
						value={(userdata && userdata.skills) || " "}
						placeholder="Type Domain"
						onChange={handleChange}
					/>
					<div className="userprofile_university">
						<div>
							<span>Q. College / University name ?</span>
							<input
								type="text"
								name="collegeName"
								value={(userdata && userdata.collegeName) || " "}
								placeholder="Type college name"
								onChange={handleChange}
							/>
						</div>
						<div>
							<span>Q. Year of graduation ?</span>
							<input
								type="text"
								name="graduationYear"
								placeholder="Type college name"
								value={(userdata && userdata.graduationYear) || " "}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="userprofile_university">
						<div>
							<span>Your Github profile link ?</span>
							<input
								style={{ fontFamily: "Roboto" }}
								type="text"
								name="github"
								value={(userdata && userdata.github) || " "}
								placeholder="https://github.com/santosharuraj"
								onChange={handleChange}
							/>
						</div>
						<div>
							<span>Your LinkedIn profile link ?</span>
							<input
								type="text"
								name="linkedin"
								value={(userdata && userdata.linkedin) || " "}
								placeholder="https://in.linkedin.com/in/santoshraj"
								onChange={handleChange}
							/>
						</div>
					</div>
					<span>Upload Resume</span>
					<input
						type="file"
						accept="application/pdf"
						placeholder="Name"
						onChange={handleChange}
						name="resume"
					/>
					<Button
						onClick={handleSubmit}
						variant="contained"
						className="updateProfileBtn"
					>
						{loading ? "Updating..." : "Update Profle"}
					</Button>
				</div>
				<div>
					<img
						src="https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png"
						alt=""
					/>
					<Button className="uploadImg" variant="outlined">
						Upload Picture
					</Button>
				</div>
			</div>

			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Profile Updated Successfuly"
				action={action}
			/>
		</>
	);
};

export default UserProfile;
