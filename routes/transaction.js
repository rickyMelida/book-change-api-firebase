const express = require("express");
const router = express.Router();
const {setTransacion} = require('../controllers/transaction');

/**
 * @swagger
 *  tags:
 *    name: Libros
 *    description: Obtener todo lo referente a los libros
 */

/**
 * @swagger
 * /transaction/set-transaction:
 *   post:
 *     tags: [Transacciones]
 *     description: Realizamos una transaccion especifica.
 *     parameters:
 *       - name: Interested Book
 *         in: query
 *         description: UID del libro
 *         required: true
 *         type: string
 *         example: "1e4f75a7-efa4-4584-a24e-161128964200"
 *       - name: Interested User
 *         in: query
 *         description: UID del Usuario Interesado
 *         required: true
 *         type: string
 *         example: "1e4f75a7-efa4-4584-a24e-161128964200"
 *       - name: Owner Book
 *         in: query
 *         description: UID del Dueño del Libro
 *         required: true
 *         type: string
 *         example: "1e4f75a7-efa4-4584-a24e-161128964200"
 *       - name: Transaction Type
 *         in: query
 *         description: Tipo de Transaccion
 *         required: true
 *         type: string
 *         example: change
 *       - name: Transaction Completed
 *         in: query
 *         description: Verifica que se haya completado la transaccion exitosamente
 *         required: true
 *         type: boolean
 *         example: true
 *       - name: Observation
 *         in: query
 *         description: Observacion
 *         required: true
 *         type: string
 *         example: No responde dueño del libro
 *     responses:
 *       200:
 *         description: Transaccion exitosa 
 *       404:
 *         description: Libro o Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post("/transaction/set-transaction", setTransacion);

module.exports = router;

