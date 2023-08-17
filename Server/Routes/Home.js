import { Router } from "express";
const Routes = Router();
Routes.get("/", (req, res) => {
  res.send("This is home page!");
});

export default Routes;
