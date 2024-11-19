const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

//Importando o módulo
const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

/*Testando a conexão
sequelize.authenticate()
            .then(() => {   //authenticate é assíncrono, por isso a listen ocorre antes
                console.log("Conexão sucesso!");
            }).catch(error => {
                console.log("Erro!");
            });
*/

//Atualiza as colunas
sequelize.sync({ alter: true }) //Se houver divergência entre modelo e tabela, reconstroi a tabela e mantem os dados
        .then(() => {
            console.log("BD sincronizado.");
        }).catch(error => {
            console.log("Erro!");
        });

app.use(express.json());

//ROTAS: app.[Method]([Path], [Handler])
app.get('/usuarios', async (req, res) => {
    //Retorna todos os usuários
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.log("Erro ao exibir usuários: ", usuarios);
    }
});

app.get('/usuario/:id', async (req, res) => {
    const usuario_id = req.params.id;
    
    const usuario = await Usuario.findAll({
        where: {
            id_usuario: usuario_id,
        },
    });
    
    if (usuario.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    
    res.json(usuario);
});

app.post('/usuario', async (req, res) => {
    const dados = req.body;

    const usuario = await Usuario.create(
        {
            nome: dados.nome,
            login: dados.login,
            email: dados.email,
            senha: dados.senha,
            permissao: dados.permissao,
        },
    )

    res.status(201).json(usuario);
});

app.delete('/usuario/:id', async (req, res) => {
    const id_usuario = req.params.id;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
        return
    }

    await usuario.destroy();
    res.status(204).json({ message: "Usuário deletado com sucesso!" });
});

app.put('/usuario/:id', async (req, res) => {
    const { nome, email, login, senha, permissao } = req.body;
    const id_usuario = req.params.id;
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
        return
    }

    await usuario.update({nome, email, login, senha, permissao});

    res.status(200).json({ message: "Usuário editado com sucesso!" });
});

app.listen(PORT, () => {
    console.log("Servidor aguardando requisições.");
});
