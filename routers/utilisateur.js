const express = require('express')
const router = express.Router()
const UtilisateurController = require('../controllers/utilisateur')


//autre request with async await
router.post('/add-admin', UtilisateurController.addAdmin)
router.post('/register', UtilisateurController.registerUser)

router.post('/signin', UtilisateurController.loginUser)

module.exports = router