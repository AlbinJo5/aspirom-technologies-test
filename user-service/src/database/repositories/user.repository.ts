import { Request } from "express";
import { IPagination } from "../../interfaces/pagination";
import { logError } from "../../utils/errorLogger";
import {
  ICreateUser,
  IUpdateUser,
  IUser,
} from "../../interfaces/user.interface";
import UserModel from "../models/user.model";

export class UserRepository {
  public async create(
    req: Request,
    createUserDto: ICreateUser
  ): Promise<IUser> {
    try {
      const createdUser = await UserModel.create(createUserDto);
      return createdUser.toObject() as IUser;
    } catch (error) {
      logError(error, req, "Repository-createUser");
      throw error;
    }
  }

  public async findAll(
    req: Request,
    pagination: IPagination
  ): Promise<{
    users: IUser[];
    totalCount: number;
    currentPage: number;
    totalPages?: number;
  }> {
    try {
      const users = await UserModel.find()
        .skip((pagination.page - 1) * pagination.limit)
        .limit(pagination.limit)
        .lean<IUser[]>();

      const totalCount = await UserModel.countDocuments();
      const totalPages = pagination.limit
        ? Math.ceil(totalCount / pagination.limit)
        : 1;

      return {
        users,
        totalCount,
        currentPage: pagination.page,
        totalPages,
      };
    } catch (error) {
      logError(error, req, "Repository-findAllUsers");
      throw error;
    }
  }

  public async findOne(req: Request, id: string): Promise<IUser> {
    try {
      const user = await UserModel.findById({
        _id: id,
      }).lean<IUser>();
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      logError(error, req, "Repository-findOneUser");
      throw error;
    }
  }

  public async update(
    req: Request,
    id: string,
    updateUserData: Partial<IUpdateUser>
  ): Promise<IUser> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        updateUserData,
        { new: true }
      ).lean<IUser>();
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      logError(error, req, "Repository-updateUser");
      throw error;
    }
  }

  public async remove(req: Request, id: string): Promise<boolean> {
    try {
      const user = await UserModel.findByIdAndDelete({
        _id: id,
      });
      if (!user) {
        throw new Error("User not found");
      }
      return true;
    } catch (error) {
      logError(error, req, "Repository-removeUser");
      throw error;
    }
  }

  public async findByEmail(req: Request, email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ email }).lean<IUser | null>();
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      logError(error, req, "Repository-findUserByEmail");
      throw error;
    }
  }
}

export default UserRepository;
