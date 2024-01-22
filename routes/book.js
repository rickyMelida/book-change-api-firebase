const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  getFavouriteBooks,
  getMyBooks,
  setBook,
  getBooksByUserOwner,
  getRecentsBooks,
  getFeaturedBooks,
  getOthersBooks,
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
router.get("/book", getBooks);

/**
 * @swagger
 * /api/book/{uid}:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene un libro por su UID
 *     parameters:
 *       - name: uid
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
router.get("/book/:uid", getBook);

/**
 * @swagger
 * /api/book/byUser/{uid}:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene un libro por el UID del Usuario
 *     parameters:
 *       - name: uid
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
router.get("/book/byUser/:uid", getBooksByUserOwner);

/**
 * @swagger
 * /api/book/favourite/{uid}:
 *   get:
 *     tags: [Libros]
 *     description: Obtiene un libro por id marcado como favorito.
 *     parameters:
 *       - name: uid
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
router.get("/book/favourite/:id", getFavouriteBooks);


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
router.get("/book/my/:id", getMyBooks);

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
router.post("/book/set-book", mdUpload, setBook);

/**
 * @swagger
 * /api/book/getRecents/{amount}:
 *   get:
 *     tags: [Libros]
 *     description: Obtenemos una cantidad n de libros recien subidos
 *     parameters:
 *       - name: amount
 *         in: path
 *         description: Cantidad de datos a devolver
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/book/getRecents/:amount", getRecentsBooks);

/**
 * @swagger
 * /api/book/getFeaturedBooks/{amount}:
 *   get:
 *     tags: [Libros]
 *     description: Obtenemos una cantidad n de libros relevantes
 *     parameters:
 *       - name: amount
 *         in: path
 *         description: Cantidad de datos a devolver
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/book/getFeaturedBooks/:amount", getFeaturedBooks);


/**
 * @swagger
 * /api/book/getOthersBooks/{amount}:
 *   get:
 *     tags: [Libros]
 *     description: Obtenemos una cantidad n de otros libros que no sean muy relevantes ni recientes
 *     parameters:
 *       - name: amount
 *         in: path
 *         description: Cantidad de datos a devolver
 *         required: true
 *         type: number 
 *     responses:
 *       200:
 *         description: Libro encontrado 
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/book/getOthersBooks/:amount", getOthersBooks);

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
router.post("/book/find", findBook);

module.exports = router;
