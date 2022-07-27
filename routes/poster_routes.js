const Router = require("express"),
    multer = require("multer"),
    upload = multer({ dest: "controllers/static/" }),
    router = new Router(),
    posterController = require("../controllers/poster_controller");


router.post("/poster", posterController.createPoster);
router.post("/picture/:id", upload.single("picture"), posterController.uploadPicture);

router.get("/posters", posterController.getAllPosters);
router.get("/postern/:num", posterController.getNumPosters);
router.get("/poster/:id", posterController.getPoster);
router.get("/picture/:id", posterController.getPicture);

router.put("/poster", posterController.editPoster);

router.delete("/poster/:id", posterController.deletePoster);

router.get("/postersort/:feature", posterController.sortPosters);
router.get("/posterfilt", posterController.filterPosters);

module.exports = router;
