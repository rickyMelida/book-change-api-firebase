const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  getFavouriteBooks,
  getMyBooks,
  setBook,
  getBookByUserOwner,
  getRecentsBooks,
  getFeaturedBooks,
  getothersBooks,
  findBook,
} = require("../controllers/book");

const multipart = require("connect-multiparty");
const mdUpload = multipart({ uploadDir: "./upload" });

/**
 * @swagger
 *  tags:
 *    name: Libros
 *    description: Obtener todo lo referente a los libros
 */

/**
 * @swagger
 * /api/book/:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene todos los libros
 *     responses:
 *       200:
 *         description: Todos los libros dentro de la Base de Datos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getBooks);

/**
 * @swagger
 * /api/book/{uid}:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene un libro por su UID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UID del libro a buscar
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Libro encontrado
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/:uid", getBookById);

/**
 * @swagger
 * /api/book/byUser/{uid}:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene un libro por el UID del Usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UID del libro a buscar
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/byUser/:uid", getBookByUserOwner);

/**
 * @swagger
 * /api/book/favourite/{id}:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene un libro por id marcado como favorito.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del libro a buscar
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/favourite/:id", getFavouriteBooks);


/**
 * @swagger
 * /api/book/my/{id}:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene el libro propio del usuario en base a un id.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del libro a buscar
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/my/:id", getMyBooks);

/**
 * @swagger
 * /api/book/set-book:
 *   post:
 *     tags: [Libros]
 *     description: Subimos un libro a una cuenta en especifica.
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post("/set-book", mdUpload, setBook);

/**
 * @swagger
 * /api/book/getRecents/:amount:
 *   get:
 *     tags: [Libros]
 *     description: Obtenemos una cantidad n de libros recien subidos
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/getRecents/:amount", getRecentsBooks);

/**
 * @swagger
 * /api/book/getFeaturedBooks/:amount:
 *   get:
 *     tags: [Libros]
 *     description: Obtenemos una cantidad n de libros relevantes
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/getFeaturedBooks/:amount", getFeaturedBooks);


/**
 * @swagger
 * /api/book/getothersBooks/:amount:
 *   get:
 *     tags: [Libros]
 *     description: Obtenemos una cantidad n de otros libros que no sean muy relevantes ni recientes 
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/getothersBooks/:amount", getothersBooks);

/**
 * @swagger
 * /api/book/find:
 *   post:
 *     tags: [Libros]
 *     parameters:
 *     - name: nombre
 *       description: Nombre del libro a buscar
 *       required: true
 *       type: string
 *     description: Buscamos un libro en especifico
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post("/find", findBook);

module.exports = router;
