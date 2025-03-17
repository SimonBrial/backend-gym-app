import config from "./config/config";
import "dotenv/config";
import { connection } from "./db/connection";
import express, { Response, Request, NextFunction } from "express";
// import cors from "cors";
import userRouter from "./routes/user.route";
import trainerRouter from "./routes/trainer.route";
import invoiceRouter from "./routes/invoice.route";

const app = express();

// CORS Settings

const allowedOrigins = ["http://localhost:3001"];
/* app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
); */

// Middleware para establecer encabezados CORS
const corsSolved = (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // res.header("Access-Control-Allow-Origin", "*"); // Permite todas las fuentes, ajusta según necesites
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  // Si es una solicitud OPTIONS, responde con estado 200
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(corsSolved);
app.use(express.json());

// Connection with DDBB
connection();

// Routes
// Test route
app.get("/v1", (req: Request, res: Response) => {
  res.send("Server Running").status(200);
});

// User Route
app.use("/v1", userRouter);
// Trainer Route
app.use("/v1", trainerRouter);
// Invoice Route
app.use("/v1", invoiceRouter);

// Server Connection
app.listen(config.PORT, () =>
  console.log(`Node Server is running on http://localhost:${config.PORT}`),
);

/*
// Use the cors middleware with a configuration object
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
*/
