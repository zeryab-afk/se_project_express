// ✅ FIX: express import moved above local imports (import/order)
const express = require('express');
const { getUsers, getUser, createUser } = require('../controllers/users');

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;
