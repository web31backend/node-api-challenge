let express = require("express");
let router = express.Router();

// bringing in projects db/methods
let Projects = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
    Projects.get()
    .then(projects => {
        if(!projects) {
            res.status(404).json({ message: "No data found in database" })
        } else {
            res.status(200).json(projects)
        }
    })
    .catch(err => res.status(500).json({ errorMessage: "Could not process data request" }))
})

module.exports = router;