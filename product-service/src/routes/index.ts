import { Router } from "express";
import exampleRoute from "./exampleRoute";
import errorRoute from "./error";
import productRoute from "./product.route";

const router = Router();
const version = "v1";
const webRoute = "web";
export const prefix = `/${version}/${webRoute}`;

router.use(`${prefix}/example`, exampleRoute);
router.use(`${prefix}/product`, productRoute);
router.use(`${prefix}/error`, errorRoute);

export default router;
