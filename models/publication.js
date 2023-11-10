const mongoose = require("mongoose")

const PublicationSchema =  mongoose.Schema({
    titre: { type: String, required: true},
    date:{  type: Date, default: Date.now},
    contenu: { type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    //relation entre user et post(avec id)
    // PostOwner : {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // },
    // followers: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }]

    
})
PublicationSchema.virtual("résumé").get(function () {
    return this.contenu.substring(0, 10);
})

module.exports = mongoose.model("Publication", PublicationSchema)