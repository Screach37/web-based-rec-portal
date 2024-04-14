import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			unique: true,
		},
		username: {
			type: String,
		},
		collegeName: {
			type: String,
		},
		graduationYear: {
			type: String,
		},
		skills: {
			type: String,
		},
		resume: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		github: {
			type: String,
		},
		profileImg: {
			type: String,
		},
		userType: {
			type: String,
		},
		saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
		applied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
	},
	{
		timestamps: true,
	}
);

const UserModal = new mongoose.model("User", schema);

export default UserModal;
