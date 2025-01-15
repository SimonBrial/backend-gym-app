"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
require("dotenv/config");
const connection_1 = require("./db/connection");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
// CORS Settings
const configCors = {
    origin: "*",
};
app.use((0, cors_1.default)(configCors));
app.use(express_1.default.json());
(0, connection_1.connection)();
// Routes
// Test route
app.get("/v1", (req, res) => {
    res.send("Hello world!").status(200);
});
// User Route
app.use("/v1", user_route_1.default);
// Server Connection
app.listen(config_1.default.PORT, () => console.log(`Node Server is running on http://localhost:${config_1.default.PORT}`));
//# sourceMappingURL=app.js.map