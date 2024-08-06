import { Request, Response } from "express";
import UserRepository from "../database/repositories/user.repository";
import { ICreateUser, IUpdateUser, IUser } from "../interfaces/user.interface";
import { logError } from "../utils/errorLogger";
import { paginationHandler } from "../utils/paginationHandler";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const pagination = paginationHandler(req);
      const users = await this.userRepository.findAll(req, pagination);
      res.sendFormatted(users, "Users retrieved successfully");
    } catch (error) {
      await logError(error, req, "Service-getUsers");
      res.sendError(error, "User retrieval failed");
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const user: ICreateUser = req.body;
      const newUser = await this.userRepository.create(req, user);
      res.sendFormatted(newUser, "User created successfully", 201);
    } catch (error) {
      await logError(error, req, "Service-createUser");
      res.sendError(error, "User creation failed");
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user: IUpdateUser = req.body;
      const updatedUser = await this.userRepository.update(req, id, user);
      if (!updatedUser) {
        res.sendError(null, "User not found", 404);
        return;
      }
      res.sendFormatted(updatedUser, "User updated successfully");
    } catch (error) {
      await logError(error, req, "Service-updateUser");
      res.sendError(error, "User update failed");
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userRepository.remove(req, id);
      res.sendFormatted(null, "User deleted successfully");
    } catch (error) {
      await logError(error, req, "Service-deleteUser");
      res.sendError(error, "User deletion failed");
    }
  }

  public async findUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findOne(req, id);
      if (!user) {
        res.sendError(null, "User not found", 404);
        return;
      }
      res.sendFormatted(user, "User retrieved successfully");
    } catch (error) {
      await logError(error, req, "Service-findUserById");
      res.sendError(error, "User retrieval failed");
    }
  }
}

export default UserService;
