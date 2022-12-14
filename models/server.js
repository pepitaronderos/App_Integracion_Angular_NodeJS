//External
import express from 'express';
import cors from 'cors';

//Internal
import { dbConnection } from '../database/config.js';
import {
	routerLogin,
	routerSignin,
	routerRecipes
} from '../routes/index.js';

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			login: "/login",
			signup: "/signup",
			save: "/save",
			fetch: "/fetch"
		}
		this.conectDB();
		this.middlewares();
		this.routes();
	}

	async conectDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.paths.login, routerLogin);
		this.app.use(this.paths.signup, routerSignin);
		this.app.use(this.paths.save, routerRecipes);
		this.app.use(this.paths.fetch, routerRecipes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`);
		});
	}
}

export {
	Server
}