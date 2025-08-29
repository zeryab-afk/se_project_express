const { getUsers, getUser, createUser } = require('../controllers/users');
const router = require('express').Router();

router.get("/", getUsers);
router.get("/:userId", getUser); // This must use the getUser controller function
router.post("/", createUser);

module.exports = router;