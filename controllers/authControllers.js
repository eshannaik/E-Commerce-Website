const auth = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const { useReducer } = require('react');

module.exports.signup = (req,res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({msg:'Please enter all fields'})
    }

    auth.findOne({email})
    .then(user =>{
        if(user)
            return res.status(400).json({msg: 'User already exists'});

        const newUser = new auth({name,email,password});

        //hash the password using the salt created
        bcrypt.genSale(10,(err,salt) =>{
            bcrypt.hash(password,salt, (err,hash) => {
                if(err)
                    throw err;
                
                newUser.password = hash; // making the hashed value the password
                newUser.save() // save to db
                    .then(user => { // making token using the id,name and email of user with an expire time
                        jwt.sign(
                            {
                                id: user._id
                            },
                            config.get('jwtsecret'),
                            {
                                expiresIn:3600 // token expires 
                            },
                            (err,token) => {
                                if(err)
                                    throw err;

                                    // return the token and the user details excluding the password
                                res.json({
                                    token,
                                    user :{
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    });
            })
        })
    })
}

module.exports.login = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({msg: 'Please enter all fields'})
    }

    auth.findOne({email})
    .then (user => {
        if(!user)
            return res.status(400).json({msg : 'User does not exist'})

        // validation 
        bcrypt.compare(password,user.password) // comparing the hashed passwords
        .then(isMatch =>{
            if(!isMatch)
                return res.status(400).json({ msg: 'Invalid credentials'});
            // create token
            jwt.sign(
                {
                    id:user._id
                },
                config.get('jwtsecret'),
                {
                    expiresIn: 3600
                },
                (err,token) => {
                    if(err)
                        throw err;

                    res.json({
                        token,
                        user: {
                            id: user._id,
                            name:user.name,
                            email: user.email
                        }
                    });
                }
            )
        })
    })
}

module.exports.get_user = (req,res) => {
    auth.findById(req.user.id) // search for user
        .select('-password')
        .then(user => res.json(user)); // send back the user details
}