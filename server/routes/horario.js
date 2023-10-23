const router = require("express").Router();
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Error del servidor");
    }
})

module.exports = router;