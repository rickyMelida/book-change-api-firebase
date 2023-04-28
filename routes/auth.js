const express = require('express');
const auth = require('../controllers/auth');
const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: Autenticacion de Usuarios
 */

/**
 * @swagger
 * /api/auth/{uid}:
 *   get:
 *     tags: [Auth]
 *     description: Verifica si el un usuario se ha autenticado
 *     parameters:
 *       - name: uid
 *         in: path
 *         description: UID del usuario
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usuario autentica correctamente
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error en el servidor
 */
router.get('/auth/:uid', auth.isAuth);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Auth]
 *     description: Registro de un nuevo usuario
 *     parameters:
 *       - name: Email
 *         in: query
 *         description: Email con el que el usuario se va a autenticar
 *         required: true
 *         type: string
 *         example: my_email@gmail.com
 *       - name: Password
 *         in: query
 *         description: Password
 *         required: true
 *         type: string
 *         example: asr55d.ffe
 *       - name: Nombre del Usuario
 *         in: query
 *         description: Password
 *         required: true
 *         type: string
 *         example: Juan Perez
 *       - name: Foto de Perfil
 *         in: query
 *         description: Foto de Perfil
 *         required: true
 *         type: string
 *         example: https://myimage.com/my_image.jpg
 *       - name: Numero de Telefono
 *         in: query
 *         description: Numero de telefono para poder contactar
 *         required: true
 *         type: string
 *         example: +595991123456
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error en el servidor
 */
router.post('/auth/signup', auth.signUp);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: [Auth]
 *     description: Registro de un nuevo usuario
 *     parameters:
 *       - name: Email
 *         in: query
 *         description: Email del Usuario
 *         required: true
 *         type: string
 *         example: my_email@gmail.com
 *       - name: Password
 *         in: query
 *         description: Password
 *         required: true
 *         type: string
 *         example: asr55d.ffe
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error en el servidor
 */
router.post('/auth/signin', auth.signIn);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     tags: [Auth]
 *     description: Cierre de Sesion
 *     responses:
 *       200:
 *         description: Cierre de sesion correctamente
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error en el servidor
 */
router.post('/auth/signout', auth.logOut);

module.exports = router;
