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
    createPicture(id, picturename) {
        return this.pool.query(`UPDATE posters SET picture = $2 WHERE id = $1 RETURNING *`,
        [id, picturename]);
    }


    getPoster(id) {
        return this.pool.query(`SELECT * FROM posters WHERE id = $1`, [id]);
    }
    getPosterByTitle(title) {
        return this.pool.query(`SELECT * FROM posters WHERE title = $1`, [title]);
    }
    getPosterByFeature(condition, params) { 
        return this.pool.query(`SELECT * FROM posters WHERE ${condition}`, params);
    }
    getNumPosters(num) {
        return this.pool.query(`SELECT * FROM posters LIMIT $1`, [num]);
    }
    getAllPosters() {
        return this.pool.query("SELECT * FROM posters");
    }

    editPoster(id, genre, title, year_of_release, description, rating, picture) {
        return this.pool.query(`UPDATE posters SET title = $2, genre = $3, year_of_release = $4, description = $5, rating = $6, picture = $7 WHERE id = $1 RETURNING *`,
            [id, genre, title, year_of_release, description, rating, picture]);
    }
    
    deletePoster(id) {
        return this.pool.query(`DELETE FROM posters WHERE id = $1`, [id]);
    }

    sortPosters(feature) {
        return this.pool.query(`SELECT * FROM posters ORDER BY ${feature}`);   
    }
    sortPostersDesc(feature) {
        return this.pool.query(`SELECT * FROM posters ORDER BY ${feature} DESC`);   
    }
}

module.exports = DB;