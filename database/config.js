//External
import mongoose from 'mongoose';

const dbConnection = async () => {
	mongoose.connect(process.env.MONGODB_CNN, { useNewUrlParser: true }, (err, res) => {
		if (err) throw err;

		console.log('DB ONLINE');
	});
};

export {
	dbConnection
}