import SignUpHandler from "../Handlers/SignUpHandler.js";
import { Router } from "express";
const Route = Router();
Route.post("/", SignUpHandler);

export default Route;
