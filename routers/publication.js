const express = require('express')
const router = express.Router()
const PublicationController = require('../controllers/publication')
const middlware = require('../middlewares/auth')
//faite seulement par l'auteur
router.post('/add_pub', middlware.isUtilisateur ,PublicationController.create_post)
router.get('/:id',middlware.isUtilisateur , PublicationController.get_post)


module.exports = router