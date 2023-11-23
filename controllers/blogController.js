const userModel = require("../models/user");

const getusers=async (req, res) => {
    await userModel.find({})
        .then((item) => res.render('pages/home', {users: item}))
}

const delUser=async (req, res) => {
    await userModel.deleteOne({ id: req.params.id });
    res.redirect('/user/')
}

module.exports={
    getusers,
    delUser
}