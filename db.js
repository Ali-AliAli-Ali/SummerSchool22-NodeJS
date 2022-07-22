const Pool = require("pg").Pool;

class DB {
    constructor() {
        this.pool = new Pool({
            user: "postgres",
            password: "AllHailAli",
            host: "localhost",
            port: 5432,
            database: "cinema_postgres"
        });
    }

    createPoster(title, date_of_release, description, rating) {
        return this.pool.query(`INSERT INTO poster (title, date_of_release, description, rating) values ($1, $2, $3, $4) RETURNING *`,
            [title, date_of_release, description, rating]);
    }
    getAllPosters() {
        return this.pool.query("SELECT * FROM poster");
    }
    getPoster(title) {
        return this.pool.query(`SELECT * FROM poster where title = $1`, [title]);
    }
}

module.exports = DB;