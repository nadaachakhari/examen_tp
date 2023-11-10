const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UtilisateurRoute = require('./routers/utilisateur')
const PublicationRoute = require('./routers/publication')

mongoose
    .connect("mongodb+srv://nadachakhari00:jk6sjUyH0jL770eG@cluster0.jamxd1i.mongodb.net/Examen")
    .then( () => console.log("connected"))
    .catch((e) => console.log("connection to MongoDB failed",e))

// app.use((req, res, next) => {
//     res.setHeader("Access-control-Allow-origin","*")
//     res.setHeader(
//         "Acess-Control-Allow-Headers",
//         "Origin, x-Requested-with, Content, Accept, Content-Type, Authorizaton"
//         )
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//         )
//     next()
//         })
    
    
app.use(express.json())
app.use('/user', UtilisateurRoute)
app.use('/publication', PublicationRoute)

//link de notre app: http://127.0.0.1:3000/
// app.use('/product', ProductRoute)
// app.use('/user', UserRoute)



module.exports = app