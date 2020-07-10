let express = require("express");
let cors = require("cors");
let helmet = require("helmet");
let morgan = require("morgan")

let actionsRoutes = require("../routes/actionsRoutes");
let projectsRoutes = require("../routes/projectsRoutes");


let server = express();
server.use(morgan("combined"))
server.use(express.json());
server.use(helmet());
server.use(cors());

// ROUTES ENDPOINTS
server.use("/api/actions", actionsRoutes);
server.use("/api/projects", projectsRoutes);

server.get("/api", (req, res) => {
    res.status(200).json({ api: "UP" })
})

module.exports = server;