const Router = require("express");
const router = new Router();
const posterController = require("../controllers/poster_controller");

router.post("/poster", posterController.createPoster);
router.get("/posters", posterController.getAllPosters);
router.get("/10posters", posterController.get10Posters);
router.get("/poster/:id", posterController.getPoster);
router.put("/poster", posterController.editPoster);
router.delete("/poster/:title", posterController.deletePoster);

module.exports = router;
