import express from "express";
import cors from "cors";
import mainRouter from "./features/router.js";
//import authMiddleware from "./features/auth/authMiddleware.js";
//import authRoutes from "./features/auth/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env?.JWT_SECRET) console.warn('[server] WARNING: JWT_SECRET not set');
if (!process.env?.REFRESH_SECRET) console.warn('[server] WARNING: REFRESH_SECRET not set');

// Allow the frontend dev server by default
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // curl / Postman

    if (
      origin.startsWith("http://localhost:5174") || // Vite dev server
      origin.startsWith("http://localhost:5173") || // Another common Vite port
      origin.startsWith("http://26.195.249.136:5173") ||
      origin.startsWith("http://192.168.0.133:5173") 
    ) {
      return callback(null, true);
    }
    callback(new Error('CORS not allowed'), false);
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use((req,res,next)=>{ console.log(req.method, req.originalUrl); next(); });

// Public auth endpoints must be accessible without a Bearer token.
//app.use("/api/auth", authRoutes);

// Everything else under /api requires authentication.
//app.use("/api", authMiddleware, mainRouter);

app.listen(5000, '0.0.0.0', () => {
  console.log('API running to get beer on all local interfaces');
  console.log(`Server is running to get some beer on port ${PORT}`);
  console.log(`Local instances can be accessed at: http://localhost:${PORT}/api`);
});

