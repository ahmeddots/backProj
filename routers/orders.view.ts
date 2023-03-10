import { Router } from "express";
import { knexSelectAll } from "../utils";

export const ordersViewRouter = Router();

ordersViewRouter.get("/", getAllOrdersView);

async function getAllOrdersView(req, res) {
	const data = await knexSelectAll("orders_view");

	res.json(data);
}
