const DB = require("../db");
const db = new DB();

class PosterController {   
    async createPoster(req, res) { //Admin right
        if (req.headers.admin != "ADMIN123") {
            return res.sendStatus(401);
        }
        const { title, date_of_release, description, rating } = req.body;
        try {
                const newPoster = await db.createPoster(title, date_of_release, description, rating);
                
                console.log("Poster of the film '", title, "',", date_of_release, ",", rating, ",", " created");
                res.json(newPoster);
            } 
        catch(err) { console.log(err); return res.sendStatus(404); }
    } 

    async getPoster(req, res) {    //Admin and User right

    }
    async editPoster(req, res) {   //Admin right

    }
    async deletePoster(req, res) { //Admin right

    }

    async filterPosters(req, res) {   //Admin and User right

    }
    async sortPosters(req, res) {     //Admin and User right

    }
    async getNumOfPosters(req, res) { //Admin and User right

    }
}

module.exports = new PosterController();