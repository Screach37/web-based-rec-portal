import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	jobTitle: yup.string().required(),
	Number_of_Vacancy: yup.string().required(),
	job_decription: yup.string().required(),
	job_type: yup.string().required(),
	location: yup.string().required(),
});
const CreateJob = ({ open, alljob, setOpen, setAllJob }) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [loading, setLoading] = useState(false);
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
		const { jobTitle, Number_of_Vacancy, job_decription, job_type, location } =
			data;
		const body = {
			jobTitle,
			Number_of_Vacancy,
			job_decription,
			job_type,
			location,
			companyId: user._id,
		};

		const response = await fetch("http://localhost:4000/company/createjob", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (response.status == 201) {
			const data = await response.json();
			setAllJob([data, ...alljob]);
			setOpen(false);
		} else {
			console.log(response);
		}

		console.log({ data });
		setLoading(false);
		reset();
	};
	return (
		<>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<div className="createJobClass1">
					<span>Create Job</span>
					<form
						className="createJobClass"
						onSubmit={handleSubmit(onSubmitHandler)}
					>
						<div style={{ marginTop: "20px" }}>
							<span>Job Title</span>
							<input
								type="text"
								{...register("jobTitle")}
								name="jobTitle"
								placeholder="Type job title"
							/>
							<p className="redColorError">{errors.jobTitle?.message}</p>
						</div>
						<div>
							<span>Number of vacancy</span>
							<input
								type="text"
								name="Number_of_Vacancy"
								{...register("Number_of_Vacancy")}
								placeholder="Type no of vacancy"
							/>
							<p className="redColorError">
								{errors.Number_of_Vacancy?.message}
							</p>
						</div>
						<div>
							<span>Job Description</span>
							<input
								type="text"
								{...register("job_decription")}
								name="job_decription"
								placeholder="Type job description"
							/>
							<p className="redColorError">{errors.job_decription?.message}</p>
						</div>
						<div>
							<span>Job Location</span>
							<input
								type="text"
								{...register("location")}
								name="location"
								placeholder="Type location"
							/>
							<p className="redColorError">{errors.location?.message}</p>
						</div>
						<div>
							<span>Job Type</span>
							<div>
								<label>
									<input
										type="radio"
										name="job_type"
										value="internship"
										{...register("job_type")}
									/>{" "}
									Internship
								</label>
								<label>
									<input
										type="radio"
										name="job_type"
										value="fulltime"
										{...register("job_type")}
									/>{" "}
									FullTime Job
								</label>
							</div>
							<p className="redColorError">{errors.job_type?.message}</p>
						</div>

						<button className="createjobbtn" variant="contained">
							Create
						</button>
					</form>
				</div>
			</Dialog>
		</>
	);
};

export default CreateJob;
