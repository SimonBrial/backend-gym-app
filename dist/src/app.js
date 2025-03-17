"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
require("dotenv/config");
const connection_1 = require("./db/connection");
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const user_route_1 = __importDefault(require("./routes/user.route"));
const trainer_route_1 = __importDefault(require("./routes/trainer.route"));
const invoice_route_1 = __importDefault(require("./routes/invoice.route"));
const app = (0, express_1.default)();
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
const corsSolved = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    // res.header("Access-Control-Allow-Origin", "*"); // Permite todas las fuentes, ajusta según necesites
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Si es una solicitud OPTIONS, responde con estado 200
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
};
app.use(corsSolved);
app.use(express_1.default.json());
// Connection with DDBB
(0, connection_1.connection)();
// Routes
// Test route
app.get("/v1", (req, res) => {
    res.send("Server Running").status(200);
});
// User Route
app.use("/v1", user_route_1.default);
// Trainer Route
app.use("/v1", trainer_route_1.default);
// Invoice Route
app.use("/v1", invoice_route_1.default);
// Server Connection
app.listen(config_1.default.PORT, () => console.log(`Node Server is running on http://localhost:${config_1.default.PORT}`));
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
//# sourceMappingURL=app.js.map