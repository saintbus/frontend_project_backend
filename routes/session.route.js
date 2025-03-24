const express = require('express');
const { getSessions, getSession, addSession, updateSession, deleteSession } = require('../controllers/session.controller');

const router = express.Router({ mergeParams: true });
const { protect } = require('../middlewares/auth.middlware');

router.route('/').get(protect, getSessions).post(protect, addSession);
router.route('/:id').get(protect, getSession).put(protect, updateSession).delete(protect, deleteSession);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - company
 *         - user
 *         - sessionDate
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the session
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         company:
 *           type: string
 *           format: uuid
 *           description: Company id
 *         user:
 *           type: string
 *           format: uuid
 *           description: User id
 *         sessionDate:
 *           type: string
 *           format: date-time
 *           description: Date of the session
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date of session creation
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: API for managing sessions
 */

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Get all sessions
 *     security:
 *       - bearerAuth: []
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: List of all sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 */

/**
 * @swagger
 * /session/{id}:
 *   get:
 *     summary: Get a session by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID
 *     responses:
 *       200:
 *         description: The session details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 */

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Create a new session
 *     security:
 *       - bearerAuth: []
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /session/{id}:
 *   put:
 *     summary: Update a session by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       200:
 *         description: Session updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /session/{id}:
 *   delete:
 *     summary: Delete a session by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       404:
 *         description: Session not found
 */

module.exports = router;
