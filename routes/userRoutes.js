 const express = require('express');
 const router = express.Router();
 const bcrypt = require ('bcryptjs');
 //const authMiddleware = require ('../middlewares/authmiddleware);

const User = require('../models/users');
 //const {default: ModeManager } = require ('sequelize/types/model-manager');

 // criar usuario (registro) - publico
 router.post('/' , async (req, res) =>{
    try{
        const {name , email, password} = req.body ;

        if(!name || !email || !password ) {
            return res.status(400) .json ({message :'Todos os campos são obrigatorios'})
        }
        const existingUser = await User.findOne ({where: {email}})
        if(existingUser){
            return res.status (409) .json ({message: 'email ja cadastrado'})
        }
        const hashedPassword  = await bcrypt.hash(password, 10 )
        const newUser = await User.create({name , email , passaword: hashedPassword})

        const {id} = newUser;
        res.status(201).json({id , name , email})
    }catch (erro){
        console.error('erro ao criar usuario', erro)
        res.status(500).json ({message: 'Erro interno do servidor'})
    }
 })

 module.exports = router;
