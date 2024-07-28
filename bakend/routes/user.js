import express from "express"
import { allUsers, login, logOut, SignUp } from "../controllers/User.js";
import secureRoute from "../middleware/secureRoute.js";

const router= express.Router();
router.post("/signup",SignUp);
router.post("/login",login);
router.post("/logout",logOut);
router.get("/allusers",secureRoute,  allUsers )


export default router;
