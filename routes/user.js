const express = require('express');
const router = express.Router();

const {getUser} = require('../controllers/user');

/**
 * @swagger
 *  tags:
 *    name: Usuarios
 *    description: Manejo de Usuarios
 */

/**
 * @swagger
 * /api/user/{uid}:
 *   get:
 *     tags: [Usuarios]
 *     description: Obtiene datos de un usuario a partir de uid
 *     parameters:
 *       - name: uid
 *         in: path
 *         description: UID del usuario
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Devuelve datos del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:uid', getUser);


module.exports = router;
