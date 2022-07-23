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

    createPoster(title, year_of_release, description, rating) {
        return this.pool.query(`INSERT INTO posters (title, year_of_release, description, rating) VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, year_of_release, description, rating]);
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

    editPoster(id, title, year_of_release, description, rating) {
        return this.pool.query('UPDATE posters SET title = $2, year_of_release = $3, description = $4, rating = $5 WHERE id = $1 RETURNING *',
            [id, title, year_of_release, description, rating]);
    }
    editPosterByTitle(title, year_of_release, description, rating) {
        //add throw if there are several posters with the same name
        return this.pool.query('UPDATE posters SET year_of_release = $2, description = $3, rating = $4 WHERE title = $1 RETURNING *',
            [title, year_of_release, description, rating]);
    }
    
    deletePoster(id) {
        return this.pool.query(`DELETE FROM posters WHERE id = $1`, [id]);
    }
    deletePosterByTitle(title) {
        //add throw if there are several posters with the same name
        return this.pool.query(`DELETE FROM posters WHERE title = $1`, [title]);
    }
}

module.exports = DB;