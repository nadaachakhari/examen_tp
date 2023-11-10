const Utilisateur = require('../models/utilisateur')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const addAdmin = async (req, res) => {
    //add admin et hashé le password
    
    try{
        admin = req.body
        if(admin.mot_passe || admin.status == "V" ){
            const hashedPassword = await bcrypt.hash(admin.mot_passe, 10);
            admin.mot_passe = hashedPassword;
            admin = await Utilisateur.create(admin)
            const token = admin.generateAuthToken()
            res.status(201).json({ admin, token })
        }else{
            console.error('doit ajouter un admin avec son mot de passe :', error);
        }
    }
    catch (error) {
           console.error('Erreur lors de la création de l\'administrateur :', error);
           res.status(500).json({ message: 'Erreur lors de la création de l\'administrateur', error: error.message });
       }
}
const registerUser = async (req, res, next) =>{
    try{
    data = req.body
    usr = new Utilisateur(data)
    salt = bcrypt.genSaltSync(10)
    cryptedPhone = await bcrypt.hashSync(data.telephone, salt)

    usr.telephone = cryptedPhone
    const newUser = await Utilisateur.create(usr);
    res.status(201).json({ usr: newUser})
    }
    catch (error) {
        console.error('Erreur lors de la création :', error);
        res.status(500).json({ message: 'Erreur lors de la création de', error: error.message });
    }
}

const loginUser = async (req, res, next) =>{
    data = req.body
    usr = await Utilisateur.findOne({ login: req.body.login })
    if(!usr){
        res.status(404).send('email or password invalid')
    }
    if(data.role === "author"  || data.status == "V"){
        bcrypt
        .compare(req.body.mot_pass, usr.mot_pass)
        .then((valid) => {
            if(!valid) {
                return res.status(401).json({message: "login ou mot de passe inorrectes"})
            }
            res.status(200).json({
                payload: {
                    _id: usr.id,
                    telephone: usr.telephone
                },
                token: jwt.sign(payload, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                }),
            })
        })
        .catch((error) => res.status(400).json({error: error.message}))
    }
    elseif(data.role === "admin")
    {
        bcrypt.compare(req.body.mot_pass, usr.mot_pass)
        .then((valid) => {
            if(!valid) {
                return res.status(401).json({message: "login ou mot de passe inorrectes"})
            }
            res.status(200).json({
                payload: {
                    _id: usr.id,
                    telephone: usr.telephone
                },
                token: jwt.sign(payload, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                }),
            })
        })
        .catch((error) => res.status(400).json({error: error.message}))

    }
            
    
}

module.exports = {
    addAdmin,
    registerUser,
    loginUser,
}
//admin
//valider auteur et lui affecter un mot de passe = num de telephone qui est hashé