import express from "express";
import { login, userRegister } from "../controller/authUser.js";

const route = express.Router();
route.post("/user/register", userRegister);
route.post("/login", login);

export default route;