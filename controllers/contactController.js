const Contact = require('../models/contact');
 
exports.createContact = async (req, res) => {
    try {
      const { name, email, message } = req.body;
   
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }
   
      const contact = await Contact.create({ name, email, message });
      return res.status(201).json(contact);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const erros = error.errors.map(e => e.message);
        return res.status(400).json({ errors: erros });
      }
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
 
  exports.listContact = async (req, res) => {
    try {
      const contact = await Contact.findAll({
        order: [['createdAt', 'DESC']],
      });
      return res.json(contact);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar contatos.' });
    }
  }
 