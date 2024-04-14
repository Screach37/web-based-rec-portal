import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
		jobTitle: {
			type: String,
			required: true,
		},
		Number_of_Vacancy: {
			type: String,
			required: true,
		},
		job_decription: {
			type: String,
			required: true,
		},
		job_type: {
			type: String,
			required: true,
		},
		location: {
			type: String,
		},
		appliedUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
	}
);

const JobModal = new mongoose.model("Job", schema);

export default JobModal;
