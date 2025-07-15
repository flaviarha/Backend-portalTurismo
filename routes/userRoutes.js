const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const authMiddleware = require('../middlewares/authMiddleware');
 
const User = require('../models/Users');
//const { default: ModelManager } = require('sequelize/types/model-manager');
 
// ✅ Criar usuário (registro) — público
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
 
    const { id } = newUser;
    res.status(201).json({ id, name, email });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
})
 
// construção logica Read utilizando o verbo HTTP GET
router.get('/', async (_req , res) =>{
  try {
    const users = await User.findAll({
      attributes: ['id','name','email', 'createdAt', 'updatedAt']
    });
    res.json(users)
  } catch (error) {
    res.status(500).json({message: 'Erro interno do servidor :',error})
  }
})
// contrução de buscar por ID utilizando verbo GET
router.get('/:id', async (req , res) =>{
  try {
    const users = await User.findByPk(req.params.id ,{
      attributes: ['id','name','email', 'createdAt', 'updatedAt']
    });
    res.json(users)
  } catch (error) {
    res.status(500).json({message: 'Erro interno do servidor :',error})
  }
})
 
// atualizar senha, nome e email utilizando verbo PUT do HTTP
 
router.put('/:id', async (req, res) =>{
  try {
    const {name, email, password} = req.body;
    const user = await User.findByPk(req.params.id);
    if(!user) return res.status(404).json({message: 'Usuario não encontrado'})
    if(name) user.name = name;
    if(email && email !== user.email){
      const existing = await User.findOne({where: {email } });
      if(existing) return res.status(400).json({message: 'Email ja está em uso'});
      user.email = email
    }
    if(password){
      user.password = await bcrypt.hash(password, 10)
    }
 
  } catch (error) {
    res.status(500).json({message: 'Erro interno do servidor :',error})
  }
})
 
// deletar usuario usando verbo HTTP DELETE
 
router.delete('/:id' , async (req, res)=>{
  try {
    const user = await User.findByPk(req.params.id);
    if(!user) return res.status(404).json({message: 'Usuario não encontrado'})
 
    await user.destroy();
    res.status(200).json({message: 'Usuario deletado com sucesso'})
  } catch (error) {
    res.status(500).json({message: 'Erro interno do servidor :',error})
  }
})
module.exports = router;
 