const express = require('express');
const { handleGenerateNewShortURL } = require('../controllers/url');
const router = express.Router();

/**
 * @swagger
 * /url:
 *   post:
 *     summary: Create a short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to shorten
 *     responses:
 *       200:
 *         description: The short URL was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortURL:
 *                   type: string
 */
router.post("/", handleGenerateNewShortURL);

module.exports = router;
