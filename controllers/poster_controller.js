const DB = require("../db");
const db = new DB();
const fs = require("fs");

function validCmp(cmp) {
    switch (cmp) {
        case '=':
        case '==':
        case '!=':
        case '<>':
        case '>':
        case '<':
        case '>=':
        case '<=':
            return true;
    }
}
function isValidNumFeature(feature, cmp, res) {
    if(isNaN(feature)){
        console.log("Bad " + feature);
        return res.sendStatus(400);
    }
    if(!validCmp(cmp)) {
        console.log(`Bad ${feature} condition`);
        return res.sendStatus(400);
    }
}


class PosterController {   
    async createPoster(req, res) { //Admin right
        if (req.headers.admin != "SuperADMIN") { 
            console.log("Admin rights required");
            return res.sendStatus(401); 
        }

        let { title, genre, year_of_release, description, rating } = req.body;
        try {

        genre = Array.from(new Set(genre.toLowerCase().split(", "))).filter(elem => elem != "").sort().join(", ");
        const newPoster = await db.createPoster(title, genre, year_of_release, description, rating);
        console.log("Poster of the film '", title, "',", year_of_release, ",", rating, ",", " created");
        res.json(newPoster.rows[0]);
        
        } catch(err) { 
            console.log(err); 
            return res.sendStatus(404); 
        }
    } 

    async uploadPicture(req, res) { //Admin right
        if (req.headers.admin != "SuperADMIN") { 
            console.log("Admin rights required");
            return res.sendStatus(401); 
        }

        try {

        const newPictureName = req.file.filename + req.file.originalname
        .substring(req.file.originalname.lastIndexOf("."));
        fs.rename("controllers/static/" + req.file.filename, "controllers/static/" + newPictureName, 
            function(err) {
                if ( err ) {
                    console.log(err);
                    return res.sendStatus(404); 
                }
            });
        
        const id = req.params.id;
        const newPoster = await db.createPicture(id, newPictureName);
        console.log("Picture for poster of the film '", id, "',", " uploaded");
        res.json(newPoster.rows[0]);
        
        } catch (err) {
            console.log("Error while uploading file");
            return res.sendStatus(500);
        }
    }

    async getPicture(req, res) {
        const id = req.params.id;
        const newPoster = await db.getPoster(id); 
        console.log("The picture for poster '", newPoster.rows[0].title, "' gotten");
        res.sendFile(__dirname + '/static/' + newPoster.rows[0].picture);
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

    async getAllPosters(req, res) { //Admin and User right
        try {
            const newPoster = await db.getAllPosters();
            console.log("All posters gotten");
            res.json(newPoster.rows);
            } 
        catch(err) { console.log(err); return res.sendStatus(404); }
    }

    async getNumPosters(req, res) {  //Admin and User right
        const num = req.params.num;
        const newPoster = await db.getNumPosters(num);
        console.log(num, "posters gotten");
        res.json(newPoster.rows);
    }


    async editPoster(req, res) {   //Admin right
        if (req.headers.admin != "SuperADMIN") { 
            console.log("Admin rights required");
            return res.sendStatus(401); 
        }

        let { id, title, genre, year_of_release, description, rating, picture } = req.body;
        genre = Array.from(new Set(genre.toLowerCase().split(", "))).filter(elem => elem != "").sort().join(", ");
        const editedPoster = await db.editPoster(id, title, genre, year_of_release, description, rating, picture);
        console.log("The poster ", editedPoster.rows[0].id, "'", editedPoster.rows[0].title, "' edited");
        res.json(editedPoster.rows[0]);
    }


    async deletePoster(req, res) { //Admin right
        if (req.headers.admin != "SuperADMIN") { 
            console.log("Admin rights required");
            return res.sendStatus(401); 
        }

        const id = req.params.id;
        const newPoster = await db.deletePoster(id);
        (db.getPoster(id).rows.length) ? 
            console.log("The poster '", id, "' deleted") :
            console.log("The poster not found");
        res.json(newPoster.rows[0]);
    }


    async filterPosters(req, res) {   //Admin and User right
        try {
        let where=[];
        const params=[];

        if(req.query.title) {    //filtering with title
            const orReq = [];
            req.query.title.toLowerCase()
                .split(',')
                .forEach(element => {
                    params.push(element);
                    orReq.push(`POSITION($${params.length} IN LOWER(title))>0`);
                });
            where.push(`(${orReq.join(' OR ')})`);
        }

        if(req.query.genres) {   //filtering with genre
            const orReq = [];
            req.query.genres.toLowerCase()
                .split(',')
                .forEach(element => {
                    params.push(element);
                    orReq.push(`POSITION($${params.length} IN genre)>0`);
                });
            where.push(`(${orReq.join(' OR ')})`);
        }

        if(req.query.year && req.query.yearCmp) {     //filtering with year_of_release
            isValidNumFeature(req.query.year, req.query.yearCmp, res);
            params.push(+req.query.year);
            where.push(`year_of_release${req.query.yearCmp}$${params.length}`);
        }

        if(req.query.rating && req.query.ratingCmp) {  //filtering with rating
            isValidNumFeature(req.query.rating, req.query.ratingCmp, res);
            params.push(req.query.rating);
            where.push(`rating${req.query.ratingCmp}$${params.length}`);
        }


        if (!where.length) {
            console.log("condition not found");
            return res.sendStatus(400);
        }

        const condition = where.join(' AND ');
        const newPoster = await db.getPosterByFeature(condition, params);
        if (!newPoster.rows.length) {
            console.log("Posters not found");
            return res.sendStatus(404);
        }
        console.log("The posters with chosen characteristics gotten");
        res.json(newPoster.rows);
        }
        catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async sortPosters(req, res) {     //Admin and User right
        try {
        let feature = req.params.feature;
        let newPoster, acc;
        if (feature.endsWith("Desc")) {
            feature = feature.substring(0, feature.length - 4);
            newPoster = await db.sortPostersDesc(feature);
            acc = "descending";
        }
        else {
            newPoster = await db.sortPosters(feature);
            acc = "";
        }
        console.log("Posters sorted by '", feature, "'", acc);
        res.json(newPoster.rows);
        }
        catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }
    
}

module.exports = new PosterController();