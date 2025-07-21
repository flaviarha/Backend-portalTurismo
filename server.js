const sequelize = require('./config/db');
require('dotenv').config();
const express = require('express')
 
const cors = require ('cors')
const userRoutes = require('./routes/userRoutes')
const contactRoutes = require('./routes/contactRouter')
const authRoutes = require ('./routes/authRoutes')
const app = express();

app.use(cors());
 
 
app.use(express.json());
 
app.get('/', (req, res)=> res.send('API funcionando'))
 
app.use('/api/users', userRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth' , authRoutes);
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