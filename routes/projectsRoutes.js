let express = require("express");
let router = express.Router();

// bringing in projects db/methods
let Projects = require("../data/helpers/projectModel");
// ===================================================================== GET ==========

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


router.get("/:id", (req, res) => {
    let id = req.params.id;

    Projects.getProjectActions(id)
    .then(project => {
        if(!project){
            res.status(404).json({ errorMessage: "No data found with that ID" })
        } else {
        res.status(200).json(project)
        }
    })
    .catch(err => res.status(500).json({ error: "Could not get project from DB" }))

})

// ==================================================================== POST ==========
router.post("/", (req, res) => {
    let newProject = req.body;

    if(newProject){
        if(!newProject.name || !newProject.description) {
            res.status(400).json({ message: "Must include description, and name fields" })
        } else {
            Projects.insert(newProject)
            .then(project => {
            res.status(201).json(project)
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
    Projects.get(id)
    .then(project => {
        if(project) {
            Projects.update(id, changes)
            .then(updated => {
                res.status(200).json(updated);
            })
            .catch(err => res.status(500).json({ errorMessage: "Could not update request" }));
        } else {
            res.status(404).json({ message: "Could not find project with requested ID" })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Could not process update request" })
    })
})

// ===================================================================== PUT ==========
router.delete("/:id", (req, res) => {
    let { id } = req.params;
    Projects.remove(id)
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