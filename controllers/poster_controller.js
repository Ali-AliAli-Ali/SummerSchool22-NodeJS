const DB = require("../db");
const db = new DB();

class PosterController {   
    async createPoster(req, res) { //Admin right
        if (req.headers.admin != "ADMIN123") {
            return res.sendStatus(401);
        }
        const { title, year_of_release, description, rating } = req.body;
        try {
            const newPoster = await db.createPoster(title, year_of_release, description, rating);
            console.log("Poster of the film '", title, "',", year_of_release, ",", rating, ",", " created");
            res.json(newPoster.rows[0]);
            } 
        catch(err) { console.log(err); return res.sendStatus(404); }
    } 

    async getAllPosters(req, res) { //Admin and User right
        try {
            const newPoster = await db.getAllPosters();
            console.log("All posters gotten");
            res.json(newPoster.rows);
            } 
        catch(err) { console.log(err); return res.sendStatus(404); }
    }

    async get10Posters(req, res) {  //Admin and User right

    }

    async getPoster(req, res) {    //Admin and User right
        const name = req.params.id;
        const newPoster = (!isNaN(name)) ? await db.getPoster(name) : await db.getPosterByTitle(name); 
        if (!newPoster.rows.length) { 
            console.log("The poster not found"); 
            return res.sendStatus(404); 
        }
        console.log("The poster '", newPoster.rows[0].title, "' gotten");
        res.json(newPoster.rows);
    }

    async editPoster(req, res) {   //Admin right
        const { id, title, year_of_release, description, rating } = req.body;
        const editedPoster = await db.editPoster(id, title, year_of_release, description, rating);
        console.log("The poster ", editedPoster.rows[0].id, "'", editedPoster.rows[0].title, "' edited");
        res.json(editedPoster.rows[0]);
    }

    async deletePoster(req, res) { //Admin right
        const title = req.params.title;
        const newPoster = await db.deletePoster(title);
        /*if (!newPoster.rows.length) { 
            console.log("The poster not found"); 
            return res.sendStatus(404); 
        }*/
        console.log("The poster '", title, "' deleted");
        res.json(newPoster.rows[0]);
    }

    async filterPosters(req, res) {   //Admin and User right

    }
    async sortPosters(req, res) {     //Admin and User right

    }
    async getNumOfPosters(req, res) { //Admin and User right

    }
}

module.exports = new PosterController();