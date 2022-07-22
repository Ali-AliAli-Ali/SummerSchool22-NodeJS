const Router = require("express");
const router = new Router();
const posterController = require("../controllers/poster_controller");

router.post("/poster", posterController.createPoster);
router.get("/poster", posterController.getAllPosters);
//router.get("/poster", posterController.get10Posters);
router.get("/poster/:title", posterController.getPoster);
router.put("/poster", posterController.editPoster);
router.delete("/poster", posterController.deletePoster);

module.exports = router;
