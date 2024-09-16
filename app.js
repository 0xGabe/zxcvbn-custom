const express = require('express');
const zxcvbn = require('zxcvbn');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Carregar a lista personalizada de senhas em um arquiov JSON
// as senhas devem estar direcionadas nessa lista, sendo uma por linha.
const customWordlistPath = path.join(__dirname, 'wordlist.json');
let customWordlist = [];
try {
    const wordlistData = fs.readFileSync(customWordlistPath, 'utf8');
    customWordlist = JSON.parse(wordlistData);
    console.log(wordlistData)
} catch (err) {
    console.error('Erro ao carregar a lista de senhas:', err);
}

// Personalizar a função zxcvbn para incluir a lista personalizada
function checkPassword(password) {
    // Adiciona palavras personalizadas à lista interna do zxcvbn
    const result = zxcvbn(password, customWordlist);
    return result;
}

app.use(express.static('public'));
app.use(express.json());

// Rota para verificar a força da senha
app.post('/check-password', (req, res) => {
    const password = req.body.password || '';
    const result = checkPassword(password);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
