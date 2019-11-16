const db = require('../config/config');
const config = require('../config/config');
const ROLES = config.ROLES;
const User = db.user;
const Role = db.role;

const checkDuplicate = (req, res, next) => {
    console.log("WE ARE HERE");

    console.log(req.body.username);

    // return next(null)

    // Check Username to see if its all ready in use
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send("Fail -> Username is already in use");
            return;
        }

        // Check Email to see if Email is in use
        console.log(req.body.email);
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then( user => {
            if(user){
                res.status(400).send("Fail -> Email is already in use")
            }
            
            next();
        });
    });
}

const checkRoles = (req,res,next) => {
    for(let i=0; i<req.body.length; i++){
        if(!ROLES.includes(req.body.roles[i].toUpperCase())){
        res.status(400).send("Fail -> Role does NOT exist = " + req.body.roles[i]);
            return;
        }
    }
    next();
}

 
const signUpVerify= {};
signUpVerify.checkDuplicate = checkDuplicate;
signUpVerify.checkRoles = checkRoles;

module.exports = signUpVerify;

