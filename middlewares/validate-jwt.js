//External
import jsonwebtoken from "jsonwebtoken";

//Internal
import { User } from "../models/index.js";

const validateJWT = async (req, res, next) => {
	const { auth } = req.query;

	if (!auth) {
		return res.status(401).json({
			msg: "There's no token"
		});
	}

	try {
		const { uid } = jsonwebtoken.verify(auth, process.env.SECREORPRIVATEKEY);
		const user = await User.findById(uid);

		req.user = user;
		next();
	} catch (error) {
		console.log(error);

		return res.status(401).json({
			msg: "Invalid token"
		});
	}
}

export {
	validateJWT
}