import CompanyModal from "../model/CompanyModal.js";
import JobModal from "../model/JobModal.js";
import UserModal from "../model/UserModal.js";
import mongoose from "mongoose";
export const getSingleUser = async (req, res) => {
	const id = req.params.id;
	try {
		const userExist = await UserModal.findById(id);
		if (userExist) {
			res.status(200).json(userExist);
		} else {
			res.status(400).json("User Not exist");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getAllUser = async (req, res) => {
	try {
		const users = await UserModal.find().sort({ createdAt: -1 });
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const updateUser = async (req, res) => {
	const id = req.params.id;
	const { userType } = req.body;
	try {
		if (mongoose.Types.ObjectId.isValid(id)) {
			if (userType == "student") {
				const userUpdated = await UserModal.findByIdAndUpdate(id, req.body, {
					new: true,
				});
				res.status(200).json(userUpdated);
			} else {
				const userUpdated = await CompanyModal.findByIdAndUpdate(id, req.body, {
					new: true,
				});
				res.status(200).json(userUpdated);
			}
		} else {
			throw new Error("Invalid ObjectId");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const applied_for_job = async (req, res) => {
	const { userId, jobId } = req.body;
	try {
		const user = await UserModal.findById(userId);
		if (!user) {
			return res.status(400).json("User not exist");
		}
		const is_applied = user.applied.find((id) => id == jobId);
		if (is_applied) {
			const value = await UserModal.findByIdAndUpdate(
				userId,
				{
					$pull: { applied: jobId },
				},
				{ new: true }
			);
			await JobModal.findByIdAndUpdate(
				jobId,
				{
					$pull: { appliedUser: userId },
				},
				{ new: true }
			);
			res.status(200).json(value);
		} else {
			const value = await UserModal.findByIdAndUpdate(
				userId,
				{
					$push: { applied: jobId },
				},
				{ new: true }
			);
			await JobModal.findByIdAndUpdate(
				jobId,
				{
					$push: { appliedUser: userId },
				},
				{ new: true }
			);
			res.status(200).json(value);
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const saved_Job = async (req, res) => {
	const { userId, jobId } = req.body;
	try {
		const user = await UserModal.findById(userId);
		if (!user) {
			return res.status(400).json("User not exist");
		}
		const is_saved = user.saved.find((id) => id == jobId);
		if (is_saved) {
			const value = await UserModal.findByIdAndUpdate(
				userId,
				{
					$pull: { saved: jobId },
				},
				{ new: true }
			);
			res.status(200).json(value);
		} else {
			const value = await UserModal.findByIdAndUpdate(
				userId,
				{
					$push: { saved: jobId },
				},
				{ new: true }
			);
			res.status(200).json(value);
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getSaved_Job = async (req, res) => {
	const id = req.params.id;
	try {
		const allsaved_job = await UserModal.findById(id).populate({
			path: "saved",
			populate: { path: "companyId", select: "_id name email" },
		});
		const saved = allsaved_job.saved;
		res.status(200).json(saved);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getApplied_Job = async (req, res) => {
	const id = req.params.id;
	try {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const allapplied_job = await UserModal.findById(id).populate({
				path: "applied",
				populate: { path: "companyId", select: "_id name email" },
			});
			if (allapplied_job !== null) {
				const applied =
					allapplied_job.applied != null && allapplied_job.applied;

				res.status(200).json(applied);
			} else {
				res.status(404).json("Document not found");
			}
		} else {
			res.status(404).json("Invalid ObjectId");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};
