let express = require("express");
let router = express.Router();

// bringing in actions db/methods
let Actions = require("../data/helpers/actionModel");

// ENDPOINTS for ACTIONS

// ===================================================================== GET ==========
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

router.get("/:id", (req, res) => {
    let id = req.params.id;

    Actions.get(id)
    .then(action => {
        if(!action){
            res.status(404).json({ errorMessage: "No data found with that ID" })
        } else {
        res.status(200).json(action)
        }
    })
    .catch(err => res.status(500).json({ error: "Could not get action from DB" }))

})

// ==================================================================== POST ==========
router.post("/", (req, res) => {
    let newAction = req.body;

    if(newAction){
        if(!newAction.notes || !newAction.description || !newAction.project_id) {
            res.status(400).json({ message: "Must include description, notes and project_id fields" })
        } else {
            Actions.insert(newAction)
            .then(action => {
            res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json({ error: "Could not process request"})
            })
        }
    } else {
        res.status(404).json({ message: "Missing information"})
    }
})

// ===================================================================== PUT ==========
router.put("/:id", (req, res) => {
    let { id } = req.params;
    let changes = req.body;
    Actions.get(id)
    .then(action => {
        if(action) {
            Actions.update(id, changes)
            .then(updated => {
                res.status(200).json(updated);
            })
            .catch(err => res.status(500).json({ errorMessage: "Could not update request" }));
        } else {
            res.status(404).json({ message: "Could not find action with requested ID" })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Could not process update request" })
    })
})

// ===================================================================== PUT ==========
router.delete("/:id", (req, res) => {
    let { id } = req.params;
    Actions.remove(id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `Successfully deleted action with ID ${id}` })
        } else {
            res.status(404).json({ error: `Could not find project to delete with ID ${id}` })
        }
    })
    .catch(err => res.status(500).json({ errorMessage: "Could not process delete request" }))
})


module.exports = router;