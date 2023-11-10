const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const user = require("../models/utilisateur")



module.exports.isAdmin = (req, res, next) =>{
    try{
      if (req.auth.role === "admin"){
        next()
      } else {
        res.status(403).json({ error: "no access to this route"})
      }
    } catch(e){
      res.status(401).json({ error: error.message })
    }

  }
  module.exports.isUtilisateur = (req, res, next) =>{
    try{
      if (req.auth.role === "author"){
        next()
      } else {
        res.status(403).json({ error: "no access to this route"})
      }
    } catch(e){
      res.status(401).json({ error: error.message })
    }

  }