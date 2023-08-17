import HandleGetLogin from "../Handlers/LoginHandler.js";
import { Router } from "express";
const Route = Router();

Route.post("/", HandleGetLogin);

export default Route;
