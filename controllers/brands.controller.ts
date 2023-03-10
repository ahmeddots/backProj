import { brandSchema } from "../models/brands.model";
import {
	knexDelete,
	knexExists,
	knexInsert,
	knexSelectAll,
	knexUpdate,
} from "../utils";

export async function getAllBrands(req, res) {
	const data = await knexSelectAll("brands");

	res.json(data);
}

export async function insertBrand(req, res) {
	const reqData = req.body;

	// validate the data and if failed then return error
	const validation = brandSchema.validate(reqData);
	if (validation.error)
		return res.status(400).json({ message: "Invalid Brand Data" });

	// insert the data
	await knexInsert("brands", reqData);

	// send back the data
	res.json({ message: "Brand inserted", data: reqData });
}

export async function updateBrand(req, res) {
	const reqData = req.body;
	const reqId = req.params.brandId;

	// validate the data and if failed then return error
	const validation = brandSchema.validate(reqData);
	if (validation.error)
		return res.status(400).json({ message: "Invalid Brand Data" });

	// try to find the brand using id and return error if not found
	const idExists = await knexExists("brands", reqId);
	if (!idExists) return res.status(404).json({ message: "Brand not found" });

	// update the data
	knexUpdate("brands", reqId, reqData);

	// send back the data
	res.json({ message: "Brand updated", data: reqData });
}

export async function deleteBrand(req, res) {
	const reqId = req.params.brandId;

	// try to find the brand using id and return error if not found
	const idExists = await knexExists("brands", reqId);
	if (!idExists) return res.status(404).json({ message: "Brand not found" });

	// delete the data
	await knexDelete("brands", reqId);

	// send back the data
	res.json({ message: "Brand deleted" });
}
