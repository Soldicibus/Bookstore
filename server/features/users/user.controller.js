import UserService from "./user.service.js";

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await UserService.getAllUsers();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const result = await UserService.getUserById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password || !role) {
        return res.status(400).json({ error: "username, email, password, and role are required" });
      }

      const result = await UserService.createUser(username, email, password, role);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;

      if (!id || !username || !email) {
        return res.status(400).json({ error: "id, username, and email are required" });
      }

      const result = await UserService.updateUser(id, username, email, password);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const result = await UserService.deleteUser(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { userId, newPassword } = req.body;

      if (!userId || !newPassword) {
        return res.status(400).json({ error: "userId and newPassword are required" });
      }

      const result = await UserService.resetPassword(userId, newPassword);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getUserData(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const result = await UserService.getUserData(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async assignRole(req, res, next) {
    try {
      // The router defines this route as POST "/:id/assign-role" so prefer params.id
      const userId = req.params.id || req.body.userId;
      const roleId = req.body.roleId;

      if (!userId || !roleId) {
        return res.status(400).json({ error: "userId and roleId are required" });
      }

      const result = await UserService.assignRole(userId, roleId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
