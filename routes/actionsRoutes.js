let express = require("express");
let router = express.Router();

// bringing in actions db/methods
let Actions = require("../data/helpers/actionModel");

// ENDPOINTS for ACTIONS
router.get("/", (req, res) => {
    Actions.get()
    .then(actions => {
        if(!actions) {
            res.status(404).json({ message: "No data found in database" })
        } else {
            res.status(200).json(actions)
        }
    })
    .catch(err => res.status(500).json({ errorMessage: "Could not process data request" }))
})

module.exports = router;