//External
import bcryptjs from "bcryptjs";

//Internal
import { User } from "../models/index.js";

const validatePassword = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const validPassword = bcryptjs.compareSync(password, user.password);

	if (!validPassword) {
		return res.status(400).json({
			msg: "The password is incorrect"
		});
	}

	next();
}

export {
	validatePassword
}