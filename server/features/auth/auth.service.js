import pool from "../../lib/db.js";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES = "1h";
const REFRESH_TOKEN_EXPIRES = "7d";

class AuthService {
  //and kind of a model too
  static async login(username, email, password) {
    if (!username && !email) throw new Error("username or email required");
    if (!password) throw new Error("password required");

    // Debug logging
    console.log(`[AuthService] Attempting login for: ${username || email}`);

    try {
      const loginIdent = username || email;
      let dbUser = null;

      const dbRes = await pool.query("SELECT * FROM login_user($1, $2)", [
        loginIdent,
        password,
      ]);
      if (dbRes.rowCount === 0) throw new Error("Invalid credentials");
      dbUser = dbRes.rows[0];

      // Debug success
      console.log(
        `[AuthService] Login successful for user_id: ${dbUser.user_id}`,
      );

      const rolesResult = await pool.query(`SELECT * FROM get_user_role($1)`, [
        dbUser.user_id,
      ]);
      const roles = rolesResult.rows.map((r) => r.role_name.toLowerCase());
      const primaryRole = roles[0] || "student";

      const payload = {
        userId: dbUser.user_id,
        username: dbUser.username,
        email: dbUser.email,
        roles: roles,
        role: primaryRole,
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      });
      const refreshToken = jwt.sign(
        { userId: payload.userId, roles: payload.roles },
        process.env.REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES },
      );

      return {
        accessToken,
        refreshToken,
        roles,
        role: primaryRole,
        user: { id: payload.userId, username: payload.username },
      };
    } catch (error) {
      console.error(`[AuthService] Login error:`, error);
      if (error.code === "28P01") {
        throw new Error("Invalid credentials");
      }
      throw new Error(error.message || "Login failed");
    }
  }

  static async register(username, email, password) {
    if (!username) throw new Error("username required");
    if (!email) throw new Error("email required");
    if (!password) throw new Error("password required");
    try {
      const res = await pool.query(
        "SELECT proc_register_user($1, $2, $3) AS new_id",
        [username, email, password],
      );
      if (res.rowCount === 0) throw new Error("Registration failed");
      const newId = res.rows[0].new_id;

      const payload = {
        userId: newId,
        username,
        email,
        roles: ["student"],
        role: "student",
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      });
      const refreshToken = jwt.sign(
        { userId: newId, roles: ["student"] },
        process.env.REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES },
      );

      return {
        accessToken,
        refreshToken,
        role: "student",
        roles: ["student"],
        user: { id: newId, username },
      };
    } catch (error) {
      if (error.code === "23505") {
        throw new Error(`Username or email '${username}' already exists.`);
      }
      if (error.code === "23514") {
        throw new Error(`Username or email cannot be empty`);
      }
      throw new Error(error);
    }
  }

  static refreshToken(oldToken) {
    try {
      const payload = jwt.verify(oldToken, process.env.REFRESH_SECRET);

      const accessToken = jwt.sign(
        {
          userId: payload.userId,
          roles: payload.roles,
          role: payload.roles[0] || "student",
        },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES },
      );
      return accessToken;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
  static async switchRole(userId, targetRole) {
    const rolesResult = await pool.query(`SELECT * FROM get_user_role($1)`, [
      userId,
    ]);
    const roles = rolesResult.rows.map((r) => r.role_name.toLowerCase());

    if (!roles.includes(targetRole.toLowerCase())) {
      throw new Error(`User does not possess the '${targetRole}' role.`);
    }

    const userRes = await pool.query(
      "SELECT username, email FROM users WHERE id = $1",
      [userId],
    );
    const user = userRes.rows[0];

    const payload = {
      userId: userId,
      username: user.username,
      email: user.email,
      roles: roles,
      role: targetRole.toLowerCase(),
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });

    return {
      accessToken,
      activeRole: targetRole.toLowerCase(),
    };
  }
}
export default AuthService;
