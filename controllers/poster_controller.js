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
            return res.sendStatus(500);
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
        
        } catch(err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }

    async getPicture(req, res) {   //Admin and User right
        try {

        const id = req.params.id;
        const poster = await db.getPoster(id); 
        if (!poster.rows.length) { 
            console.log("The poster not found"); 
            return res.sendStatus(404); 
        }
        if (!poster.rows[0].picture) {
            console.log("Picture is not uploaded");
            return res.sendStatus(404);
        }

        console.log("The picture for poster '", poster.rows[0].title, "' gotten");
        res.sendFile(__dirname + '/static/' + poster.rows[0].picture);
        } catch(err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }

    async getPoster(req, res) {    //Admin and User right
        try {

        const name = req.params.id;
        const poster = (!isNaN(name)) ? await db.getPoster(name) : await db.getPosterByTitle(name); 
        if (!poster.rows.length) { 
            console.log("The poster not found"); 
            return res.sendStatus(404); 
        }
        console.log("The poster '", poster.rows[0].title, "' gotten");
        res.json(poster.rows);

        } catch(err) { 
            console.log(err);
            return res.sendStatus(500); 
        }
    }

    async getAllPosters(req, res) { //Admin and User right
        try {

        const poster = await db.getAllPosters();
        console.log("All posters gotten");
        res.json(poster.rows);

        } catch(err) { 
            console.log(err);
            return res.sendStatus(500); 
        }
    }

    async getNumPosters(req, res) {  //Admin and User right
        try {

        let num = req.params.num;
        if (isNaN(num) || num <= 0) {
            console.log("Bad number of posts given");
            return res.sendStatus(400);
        }
        const maxrows = await db.getPostersAmount();
        if (num > Number(maxrows.rows[0].count)) num = maxrows.rows[0].count;

        const poster = await db.getNumPosters(num);
        console.log(num, "posters gotten");
        res.json(poster.rows);

        } catch(err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }


    async editPoster(req, res) {   //Admin right
        if (req.headers.admin != "SuperADMIN") { 
            console.log("Admin rights required");
            return res.sendStatus(401); 
        }
        try {

        let { id, title, genre, year_of_release, description, rating, picture } = req.body;
        genre = Array.from(new Set(genre.toLowerCase().split(", "))).filter(elem => elem != "").sort().join(", ");
        const editedPoster = await db.editPoster(id, title, genre, year_of_release, description, rating, picture);
        console.log("The poster ", editedPoster.rows[0].id, "'", editedPoster.rows[0].title, "' edited");
        res.json(editedPoster.rows[0]);

        } catch(err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }


    async deletePoster(req, res) { //Admin right
        if (req.headers.admin != "SuperADMIN") { 
            console.log("Admin rights required");
            return res.sendStatus(401); 
        }
        try {

        const id = req.params.id;
        let poster = await db.getPoster(id);
        if (!poster.rows.length) { 
            console.log("The poster not found"); 
            return res.sendStatus(200) 
        }
        console.log("The poster '", id, "' deleted");
        poster = await db.deletePoster(id);
        res.json(poster.rows[0]);

        } catch(err) {
            console.log(err);
            return res.sendStatus(500);
        }
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
            console.log("Condition not found");
            return res.sendStatus(400);
        }

        const condition = where.join(' AND ');
        const poster = await db.getPosterByFeature(condition, params);
        if (!poster.rows.length) {
            console.log("Posters not found");
            return res.sendStatus(404);
        }
        console.log("The posters with chosen characteristics gotten");
        res.json(poster.rows);
        
        }
        catch(err) {
            console.log(err);
            return res.sendStatus(400);
        }
    }

    async sortPosters(req, res) {     //Admin and User right
        try {

        let feature = req.params.feature;
        let poster, acc;
        if (feature.endsWith("Desc")) {
            feature = feature.substring(0, feature.length - 4);
            poster = await db.sortPostersDesc(feature);
            acc = "descending";
        }
        else {
            poster = await db.sortPosters(feature);
            acc = "";
        }
        console.log("Posters sorted by '", feature, "'", acc);
        res.json(poster.rows);

        }
        catch(err) {
            console.log(err);
            return res.sendStatus(400);
        }
    }
    
}

module.exports = new PosterController();