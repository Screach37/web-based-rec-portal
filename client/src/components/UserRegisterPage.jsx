import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	mobile: yup.string().required(),
	password: yup.string().min(8).max(32).required(),
	userType: yup.string().required("Please select user type"),
});

const RegisterPage = () => {
	const [userData, serUserData] = useState(null);
	const [loading, setLoading] = useState(false);
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
		setLoading(true);
		const { name, email, mobile, password, userType } = data;
		console.log(userType, name);
		const body = {
			name: name,
			email: email,
			mobile: mobile,
			password: password,
			userType: userType,
		};
		const response = await fetch("https://web-based-rec-portal-phi.vercel.app:4000/auth/user/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (response.status == 201) {
			const data = await response.json();
			serUserData(data);
			localStorage.setItem("user", JSON.stringify(data));
			navigate("../");
			window.location.reload();
		} else {
			console.log(response);
		}

		console.log({ data });
		setLoading(false);
		reset();
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
				</div>{" "}
			</div>
			<div>
				<Card className="loginCard">
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<h2>
							Lets SingUp to <span style={{ color: "#E74646" }}>JobNinja</span>
						</h2>
						<div className="userBox">
							<div>
								<div>
									<label htmlFor="userType">Register As:</label>
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
								<input
									className="userInput"
									{...register("name")}
									placeholder="Name"
									type="name"
								/>
								<p className="redColorError">{errors.name?.message}</p>
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
									{...register("mobile")}
									placeholder="Mobile"
									type="mobile"
								/>
								<p className="redColorError">{errors.mobile?.message}</p>
							</div>
							<div>
								<input
									className="userInput"
									{...register("password")}
									placeholder="Password"
									type="password"
								/>
								<p className="redColorError">{errors.password?.message}</p>
								<span
									onClick={() => navigate("../login")}
									className="linkClass"
								>
									Login?
								</span>
							</div>
						</div>

						<button className="loginBtn" type="submit">
							{loading ? "Loading" : "Sign Up"}
						</button>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default RegisterPage;
