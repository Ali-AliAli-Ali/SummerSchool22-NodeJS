const express = require("express");
const PORT = 3000;

const posterRouter = require("./routes/poster_routes");

const server = express();
server.use(express.json());
server.use("/api", posterRouter);

server.listen(PORT, () => { console.log(`server is on port ${PORT}`); });


exports.PORT = PORT;
