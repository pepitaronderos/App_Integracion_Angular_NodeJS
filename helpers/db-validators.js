//Internal
import { User } from "../models/index.js";

const emailExists = async (email = "") => {
	const existEmail = await User.findOne({ email });

	if (existEmail) {
		throw new Error(`The email ${email} is already registered`);
	}

	return true;
}

const emailNoExists = async (email = "") => {
	const existEmail = await User.findOne({ email });

	if (!existEmail) {
		throw new Error(`The email ${email} is not registered`);
	}

	return true;
}

const userExistByID = async (id) => {
	const existUser = await User.findById(id);

	if (!existUser) {
		throw new Error(`The ID ${id} does not exist`);
	}

	return true;
}

export {
	emailExists,
	emailNoExists,
	userExistByID
}