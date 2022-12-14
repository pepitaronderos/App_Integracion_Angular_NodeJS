//External
import { Router } from 'express';

//Internal
import {
	save,
	fetch
} from '../controllers/index.js';
import {
	validateFields,
	validateJWT
} from '../middlewares/index.js';

const routerRecipes = Router();

routerRecipes.put("/", [
	validateJWT,
	validateFields
], save);

routerRecipes.get("/", [
	validateJWT,
	validateFields
], fetch);

export {
	routerRecipes
}