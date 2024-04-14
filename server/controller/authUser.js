import CompanyModal from "../model/CompanyModal.js";
import UserModal from "../model/UserModal.js";
import bcrypt from "bcrypt";

const generateUsername = (name) => {
	const names = name.split(" ");

	const firstName = names[0];
	let lastName = names.length > 1 && names[names.length - 1];
	if (!lastName) {
		lastName = "";
	}
	const random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
	const username = `${firstName}${lastName}${random}`;
	return username.toLowerCase();
};
export const userRegister = async (req, res) => {
	const { userType } = req.body;
	try {
		if (userType == "student") {
			const { name, mobile, email, password, userType, resume, profileImg } =
				req.body;
			const hashpassword = await bcrypt.hash(password, 10);
			let username = generateUsername(name);
			const emailExist = await UserModal.findOne({ email });
			if (emailExist) {
				return res.status(400).json("User already exist");
			}
			const newUser = new UserModal({
				name,
				mobile,
				email,
				password: hashpassword,
				userType,
				username,
				resume,
				profileImg,
			});
			await newUser.save();
			res.status(201).json(newUser);
		} else {
			const { name, mobile, email, password, userType } = req.body;
			const hashpassword = await bcrypt.hash(password, 10);
			let username = generateUsername(name);
			const companyExist = await CompanyModal.findOne({ email });
			if (companyExist) {
				return res.status(400).json("Company already exist");
			}
			const newCompany = await CompanyModal({
				name,
				email,
				mobile,
				password: hashpassword,
				userType,
				username,
			});
			await newCompany.save();
			res.status(201).json(newCompany);
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const login = async (req, res) => {
	const { email, password, userType } = req.body;
	try {
		if (userType == "student") {
			const exist = await UserModal.findOne({ email });
			if (exist) {
				const matched_Password = await bcrypt.compare(password, exist.password);
				if (matched_Password) {
					res.status(200).json(exist);
				} else {
					res.status(401).json("Wrong credential");
				}
			} else {
				res.status(400).json("Email does not exist");
			}
		} else {
			const exist = await CompanyModal.findOne({ email });
			if (exist) {
				const matched_Password = await bcrypt.compare(password, exist.password);
				if (matched_Password) {
					res.status(200).json(exist);
				} else {
					res.status(401).json("Wrong credential");
				}
			} else {
				res.status(400).json("Email does not exist");
			}
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};
