import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "197346825",
  port: 5432
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/enviar', async (req, res) => {
  const { newUsername, newSenha } = req.body;
  const verifyRepetition = await pool.query(
    'SELECT * FROM usuario WHERE username = $1',
     [newUsername]
    )

  if (verifyRepetition.rows.length > 0) {
    return res.status(401).json({ erro: 'Nome de usuário já utilizado. Favor, escolha outro.'})
  }

  try {
    const include = await pool.query(
      'INSERT INTO usuario (username, senha) VALUES ($1, $2) RETURNING *', 
      [newUsername, newSenha]
    )
    res.status(200).json({ messagem: "Usuário criado com sucesso!" })
  }
  catch(err) {
    console.error("Deu a porra: " + err)
    res.status(500).json({ erro: 'Erro ao inserir no banco de dados' });
  }






  /*
  try {
    const resultado = await pool.query(
      'INSERT INTO usuario (username, senha) VALUES ($1, $2) RETURNING *',
      [newUsername, newSenha]
    );
    res.status(200).json({ messagem: "Usuário criado com sucesso!" });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao inserir no banco de dados' });
  }
  */
});

app.get('/consulta', async (req, res) => {
  const { username, senha } = req.query;

  try {
    const pesquisa = await pool.query(
      'SELECT * FROM usuario WHERE username = $1 AND senha = $2',
      [username, senha]
    );

    if (pesquisa.rows.length > 0) {
      res.status(200).json({ messagem: "Login válido!" });
    } else {
      res.status(401).json({ messagem: "Usuário ou senha incorretos!" });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao consultar no banco de dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
