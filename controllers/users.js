//External
import bcryptjs from "bcryptjs";

//Internal
import { User } from "../models/index.js";
import { generateJWT } from "../helpers/index.js";

const signup = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = new User({ email, password });
		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync(password, salt);
		const token = await generateJWT(user.id);
		user.idToken = token;

		await user.save();

		res.status(200).json({
			email: user.email,
			localId: user.localId,
			idToken: user.idToken,
			expiresIn: user.expiresIn
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "The user could not save, talk to the administrator"
		});
	}
}

const login = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		const token = await generateJWT(user.id);
		user.idToken = token;

		res.status(200).json({
			email: user.email,
			localId: user.localId,
			idToken: user.idToken,
			expiresIn: user.expiresIn
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "The user could not login, talk to the administrator"
		});
	}
}

export {
	signup,
	login
}