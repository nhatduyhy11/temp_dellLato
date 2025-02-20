const express = require("express");
const { createTicket } = require("../services/ticket.service");
const { authenticate } = require("../middlewares/auth/index");

const router = express.Router();

router.post("/tickets", authenticate, createTicket);

module.exports = router;