import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let usuarios = [];

app.post('/receber', (req, res) => {
    const { username, senha } = req.body;
    console.log("cabrunco")
    
    const jaExiste = usuarios.some(usuarios => usuarios.username === username && usuarios.senha === senha);

    if (jaExiste) {
        return res.json({ mensagem: "Dados repetidos!" });
    }
    else {
        usuarios.push({ username, senha });
        return res.json({ mensagem: "Dados recebidos!" });
    }

    
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});