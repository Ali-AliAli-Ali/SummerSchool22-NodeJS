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

    createPoster(title, genre, year_of_release, description, rating) {
        return this.pool.query(`INSERT INTO posters (title, genre, year_of_release, description, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, genre, year_of_release, description, rating]);
    }

    getAllPosters() {
        return this.pool.query("SELECT * FROM posters");
    }

    getPoster(id) {
        return this.pool.query(`SELECT * FROM posters WHERE id = $1`, [id]);
        }
    getPosterByTitle(title) {
        return this.pool.query(`SELECT * FROM posters WHERE title = $1`, [title]);
    }

    editPoster(id, genre, title, year_of_release, description, rating) {
        return this.pool.query('UPDATE posters SET title = $2, genre = $3, year_of_release = $4, description = $5, rating = $6 WHERE id = $1 RETURNING *',
            [id, genre, title, year_of_release, description, rating]);
    }
    
    deletePoster(id) {
        return this.pool.query(`DELETE FROM posters WHERE id = $1`, [id]);
    }
}

module.exports = DB;