import express from "express";
import {
	applied_for_job,
	getApplied_Job,
	getSaved_Job,
	getSingleUser,
	saved_Job,
	updateUser,
} from "../controller/UserController.js";

const route = express.Router();
route.get("/:id", getSingleUser);
route.put("/apply_for_job", applied_for_job);
route.put("/save_job", saved_Job);
route.get("/get_saved_job/:id", getSaved_Job);
route.get("/get_applied_job/:id", getApplied_Job);
route.put("/updateProfile/:id", updateUser);

export default route;
