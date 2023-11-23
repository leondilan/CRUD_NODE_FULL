const express = require('express')
const router = express.Router()
const userModel=require('../models/user')
const uniqid = require('uniqid');
const multer  = require('multer')
const blogController=require('../controllers/blogController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits:{
        fieldSize:2024
    },
    fileFilter:(req, file, cb)=>{
        if(file.mimetype=='image/jpeg'){
            cb(null, "c'est bon")
        }else{
            // The function should call `cb` with a boolean
            // to indicate if the file should be accepted

            // To reject this file pass `false`, like so:
            cb(null, false)

            // To accept the file pass `true`, like so:


            // You can always pass an error if something goes wrong:
            req.flash('file', 'Entrer un fichier image');
            //cb(new Error('I don\'t have a clue!'))
        }
    }
})

router.get('/', blogController.getusers)

router.get('/new-user', (req, res) => {
    res.render('pages/newUser')
})

router.post('/new-user', upload.single('file'), async (req, res) => {
    const {nom, pays, ville, tel} = req.body
    const newUser = new userModel({
        id:uniqid(),
        name: nom,
        pays: pays,
        ville: ville,
        tel: tel,
        nomImage:req.file.filename
    });
    await newUser.save()
        .then((result) => res.redirect('/user/'))
        .catch((e) => {
            req.flash('errors', e.errors);
            res.redirect('/user/new-user')
        })
})

router.get('/delete/:id', blogController.delUser)

router.get('/edit/:id', async (req, res) => {
    await userModel.find({ id: req.params.id },{_id:0,__v:0})
        .then((item) => res.render('pages/edit',{user:item[0]}))
})

router.post('/edit/:id', async (req, res) => {
    const {nom, pays, ville, tel} = req.body
    if (!nom || !pays || !ville || !tel) {
        req.flash('info', 'Tous les champs doivent etre remplis!!!');
        res.redirect(`/user/edit/${req.params.id}`)
    }else{
        await userModel.updateOne({ id: req.params.id },{
            name: nom,
            pays: pays,
            ville: ville,
            tel: tel
        })
        res.redirect(`/user/`)
    }
})

module.exports = router