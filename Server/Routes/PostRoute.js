import PostHandler from "../Handlers/PostHandler.js";
import { Router } from "express";
const Route = Router();
Route.post("/", PostHandler);

export default Route;
