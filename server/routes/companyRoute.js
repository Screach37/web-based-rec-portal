import express from "express";
import {
	createJob,
	getAllApplied_for_a_job,
	getAllJob,
	getAllJob_Posted,
	getInternship,
	get_A_Company,
	getfulltime_job,
} from "../controller/CompanyController.js";

const route = express.Router();
route.get("/getCompany/:id", get_A_Company);
route.post("/createjob", createJob);
route.get("/get_all_job", getAllJob);
route.get("/all_internship", getInternship);
route.get("/all_fulltime_job", getfulltime_job);
route.get("/all_job_posted/:id", getAllJob_Posted);
route.get("/getapplied_job/:id", getAllApplied_for_a_job);

export default route;
