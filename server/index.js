import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/AuthRoute.js";
import companyRoute from "./routes/companyRoute.js";
import userRoute from "./routes/UserRoute.js";
import uploadRoute from "./routes/UploadRoute.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
const URL = "mongodb+srv://b200226:rSZwLHAQgziw7Awc@cluster0.gmfre1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
	.connect(URL, { useNewUrlParser: true })
	.then(() => {
		app.listen(4000, () => {
			console.log("Connected");
		});
	})
	.catch((er) => {
		console.log(er);
	});

app.use("/auth", authRoute);
app.use("/company", companyRoute);
app.use("/user", userRoute);
app.use("/upload", uploadRoute);
