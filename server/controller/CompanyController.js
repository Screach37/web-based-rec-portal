import CompanyModal from "../model/CompanyModal.js";
import JobModal from "../model/JobModal.js";
import bcrypt from "bcrypt";

export const get_A_Company = async (req, res) => {
	const id = req.params.id;
	try {
		const company = await CompanyModal.findById(id);
		if (company) {
			res.status(200).json(company);
		} else {
			res.status(404).json("Company doest not exist");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};
export const createJob = async (req, res) => {
	const {
		companyId,
		jobTitle,
		Number_of_Vacancy,
		job_decription,
		job_type,
		location,
	} = req.body;

	try {
		const newJob = await JobModal({
			companyId,
			jobTitle,
			Number_of_Vacancy,
			job_decription,
			job_type,
			location,
		});
		await newJob.save();
		res.status(201).json(newJob);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getAllJob = async (req, res) => {
	try {
		const getAll = await JobModal.find()
			.populate({
				path: "companyId",
				select: "id name email",
			})
			.sort({ createdAt: -1 });
		res.status(200).json(getAll);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getInternship = async (req, res) => {
	try {
		const all = await JobModal.find({ job_type: "internship" }).sort({
			createdAt: -1,
		});

		res.status(200).json(all);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getfulltime_job = async (req, res) => {
	try {
		const all = await JobModal.find({ job_type: "fulltime" }).sort({
			createdAt: -1,
		});

		res.status(200).json(all);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getAllJob_Posted = async (req, res) => {
	const id = req.params.id;
	try {
		const all_job_posted = await JobModal.find({ companyId: id })
			.sort({
				createdAt: -1,
			})
			.populate({
				path: "companyId",
				select: "_id name email",
			});

		res.status(200).json(all_job_posted);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const getAllApplied_for_a_job = async (req, res) => {
	const id = req.params.id;
	try {
		const users = await JobModal.findById(id)
			.populate({
				path: "appliedUser",
				select: "_id name resume profileImg createdAt",
			})
			.populate({
				path: "companyId",
				select: "_id name",
			});

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error.message);
	}
};
