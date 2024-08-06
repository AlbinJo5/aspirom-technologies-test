import { Router } from "express";
import UserMiddleware from "../middlewares/user.middleware";
import UserService from "../services/user.service";

const router = Router();
const userMiddleware = new UserMiddleware();
const userService = new UserService();

/**
 * @swagger
 * /api/v1/web/user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@examplemail.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  userMiddleware.validateCreateUser.bind(userMiddleware),
  userService.createUser.bind(userService)
);

/**
 * @swagger
 * /api/v1/web/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  userMiddleware.validateUserId.bind(userMiddleware),
  userService.deleteUser.bind(userService)
);

/**
 * @swagger
 * /api/v1/web/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       500:
 *         description: Internal server error
 */

router.get("/", userService.getUsers.bind(userService));

/**
 * @swagger
 * /api/v1/web/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve user details by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  userMiddleware.validateUserId.bind(userMiddleware),
  userService.findUserById.bind(userService)
);

/**
 * @swagger
 * /api/v1/web/user/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update a user by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "user123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe 2"
 *               email:
 *                 type: string
 *                 example: "john2@exampleemail.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id",
  userMiddleware.validateUserId.bind(userMiddleware),
  userMiddleware.validateUpdateUser.bind(userMiddleware),
  userService.updateUser.bind(userService)
);

export default router;
