// Importa o Express
const express = require('express');
 
// Cria uma instância do Express
const app = express();
 
// Define uma porta (padrão: 3000)
const PORT = process.env.PORT || 3000;
 
// Rota de teste (GET /)
app.get('/', (req, res) => {
  res.send('🚀 Servidor Express está funcionando!');
});
 
// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
 