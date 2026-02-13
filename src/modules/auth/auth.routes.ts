import { Router } from "express";
import { register, login } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { AuthSchemas } from "./auth.schema";

const router = Router();

router.post("/register", validate(AuthSchemas.createUser), register);
router.post("/login", validate(AuthSchemas.loginUser), login);

export default router;