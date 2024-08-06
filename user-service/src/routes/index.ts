import { Router } from "express";
import exampleRoute from "./exampleRoute";
import errorRoute from "./error";
import userRoute from "./user.routes";

const router = Router();
const version = "v1";
const webRoute = "web";
export const prefix = `/${version}/${webRoute}`;

router.use(`${prefix}/example`, exampleRoute);
router.use(`${prefix}/error`, errorRoute);
router.use(`${prefix}/user`, userRoute);

export default router;
