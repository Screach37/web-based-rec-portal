import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
	userType: yup.string().required("Required field"),
});

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const [userData, serUserData] = useState(null);
	const [errormsg, setErrorMsg] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmitHandler = async (data) => {
		console.log(data);
		setLoading(true);
		const { name, email, mobile, password, userType } = data;
		console.log(userType, name);
		const body = {
			email: email,
			password: password,
		};
		const response = await fetch("http://localhost:4000/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.status == 200) {
			const data = await response.json();
			serUserData(data);
			localStorage.setItem("user", JSON.stringify(data));
			setErrorMsg(false);
			navigate("../");
			window.location.reload();
		} else {
			console.log(response);
			setErrorMsg(true);
		}

		console.log({ data });
		setLoading(false);
		// reset();
	};
	return (
		<div className="LoginPg">
			<div>
				<img
					src="https://www.successmantra.in/assets/assestsnew/images/career.png"
					alt=""
				/>{" "}
				<div>
					<span>
						Your career is a journey, not a destination. Embrace the challenges
						and learn from the experiences
					</span>
				</div>
			</div>
			<div>
				<Card className="loginCard">
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<h2>
							Lets Login to <span style={{ color: "#E74646" }}>JobNinja</span>
						</h2>
						<br />
						<div className="userBox">
							<div>
								<span className="linkClass">Login as :</span>
								<div>
									<label>
										<input
											type="radio"
											name="userType"
											value="student"
											{...register("userType")}
										/>{" "}
										Student
									</label>
									<label>
										<input
											type="radio"
											name="userType"
											value="company"
											{...register("userType")}
										/>{" "}
										Company
									</label>
								</div>
								<p className="redColorError">{errors.userType?.message}</p>
							</div>
							<div>
								<input
									className="userInput"
									{...register("email")}
									placeholder="Email"
									type="email"
								/>
								<p className="redColorError">{errors.email?.message}</p>
							</div>

							<div>
								<input
									className="userInput"
									{...register("password")}
									placeholder="Password"
									type="password"
								/>
								<p className="redColorError">{errors.password?.message}</p>
							</div>
							<span className="redColorError">
								{errormsg && "Something is wrong. Please try again!"}
							</span>
							<span
								onClick={() => navigate("../register")}
								className="linkClass"
							>
								Yet not registered?
							</span>
						</div>

						<br />

						<br />
						<button className="loginBtn">
							{loading ? "Loading" : "Sign in"}
						</button>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
