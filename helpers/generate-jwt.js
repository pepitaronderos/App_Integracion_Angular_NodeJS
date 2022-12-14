//External
import jsonwebtoken from "jsonwebtoken";

const generateJWT = async (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jsonwebtoken.sign(payload, process.env.SECREORPRIVATEKEY, { expiresIn: "8h" }, (error, token) => {
			if (error) {
				console.log(error);

				reject("The token was not generated");
			} else {
				resolve(token);
			}
		});
	});
}

export {
	generateJWT
}