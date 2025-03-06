import config from "./config/config";
import "dotenv/config";
import { connection } from "./db/connection";
import express, { Response, Request } from "express";
import cors from "cors";
import userRouter from "./routes/user.route";
import trainerRouter from "./routes/trainer.route";

const app = express();

// CORS Settings
const configCors = {
  origin: "*",
};

app.use(cors(configCors));
app.use(express.json());

connection();

// Routes
// Test route
app.get("/v1", (req: Request, res: Response) => {
  res.send("Hello world!").status(200);
});

// User Route
app.use("/v1", userRouter);
// invoice Route
app.use("/v1", trainerRouter);

// Server Connection
app.listen(config.PORT, () =>
  console.log(`Node Server is running on http://localhost:${config.PORT}`),
);
