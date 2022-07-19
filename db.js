const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "AllHailAli",
    host: "localhost",
    port: 5432,
    database: "cinema_postgres"
});

