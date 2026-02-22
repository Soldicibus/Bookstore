import AuthService from "./auth.service.js";

class AuthController {
	static async login(req, res, next) {
		try {
			const { username, email, password } = req.body;
			const result = await AuthService.login(username, email, password);
			return res.status(200).json(result);
		} catch (error) {
			return next(error);
		}
	}

	static async register(req, res, next) {
		try {
			const { username, email, password } = req.body;
			const result = await AuthService.register(username, email, password);
			return res.status(201).json(result);
		} catch (error) {
			return next(error);
		}
	}

	static refreshToken(req, res, next) {
		try {
			const { token } = req.body;
			if (!token) return res.status(400).json({ error: "refresh token is required" });
			const accessToken = AuthService.refreshToken(token);
			return res.status(200).json({ accessToken });
		} catch (error) {
			return next(error);
		}
	}

	static async switchRole(req, res, next) {
		try {
			const { userId, targetRole } = req.body;
			if (!userId || !targetRole) return res.status(400).json({ error: "userId and targetRole are required" });
			const result = await AuthService.switchRole(userId, targetRole);
			return res.status(200).json(result);
		} catch (error) {
			return next(error);
		}
	}
}

export default AuthController;
