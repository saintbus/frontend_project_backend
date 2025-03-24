const express = require('express');
const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = require('../controllers/companies.controller');
const {protect, authorize} = require('../middlewares/auth.middlware');
const sessionRoute = require('./session.route');

const router = express.Router();

router.route('/').get(getCompanies).post(protect, authorize('admin'), createCompany);
router.route('/:id').get(getCompany).put(protect, authorize('admin'), updateCompany).delete(protect, authorize('admin'), deleteCompany);
router.use('/:CompanyId/session/', sessionRoute);

module.exports=router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas: 
 *     Company:
 *       type: object
 *       required:
 *         - companyName
 *         - address
 *         - website
 *         - description
 *         - tel
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the company
 *         companyName:
 *           type: string
 *           description: Company name
 *         address:
 *           type: string
 *           description: Company address
 *         website:
 *           type: string
 *           description: Company URL
 *         description:
 *           type: string
 *           description: Company description
 *         tel:
 *           type: string
 *           description: Company contact number
 */

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: The company managing API
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Returns the list of all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: The list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company ID
 *     responses:
 *       200:
 *         description: Company details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /companies/{id}:
 *  put:
 *    summary: Update a company by ID
 *    tags: [Companies]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The company ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *      200:
 *        description: Company updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Company'
 *      404:
 *        description: Company not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Remove a company by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company ID
 *     responses:
 *       200:
 *         description: Company deleted
 *       404:
 *         description: Company not found
 */