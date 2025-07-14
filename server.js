const sequelize = require('./config/db');
require('dotenv').config();
const express = require('express')
 
const userRoutes = require('./routes/userRoutes')
 
const app = express();
 
app.use(express.json());
 
app.get('/', (req, res)=> res.send('api funcionando'))
 
app.use('/api/users', userRoutes)
 
const PORT = process.env.PORT;
 
sequelize.authenticate()
  .then(() => {
    console.log('servidor online e conectado com o DB')
    return sequelize.sync();
  })
  .then(() =>{
    console.log('banco de dados sincronizado')
    app.listen(PORT, () => console.log("SERVIDOR RODANDO NA PORTA: " + PORT))
  }).catch(erro => console.log("Erro interno do servidor", erro))