const Publication = require('../models/publication')


const create_post = async (req, res, next)=>{
    data = req.body
    if( data.date || data.resume){
        res.status(500).json({ message: 'Erreur lors de la création de publication', error: error.message });
    } else{
        const post = new Publication(data)
        const newPost = await post.save()
        if(post) res.status(200).json(post)
    }
    
    
}
const get_post = async (req, res, next) => {
    myId = req.params.id
    try{
        const post = await Publication.findOne({ _id: myId}).populate('owner')
        if (!post) {
            return res.status(404).json({ message: 'publication non trouvé' });
          }
          res.json({
            postOwner: post.owner,
          })
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du post avec le propriétaire et les followers', error: error.message });
  
}}

const AuthorDetails = async(req, res, next) => {
    
}

module.exports = {
    create_post,
    get_post,
    AuthorDetails

}
