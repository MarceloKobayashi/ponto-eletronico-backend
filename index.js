const express = require('express');
const app = express();
const PORT = 3000;

//Importando o módulo
const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');

/*Testando a conexão
sequelize.authenticate()
            .then(() => {   //authenticate é assíncrono, por isso a listen ocorre antes
                console.log("Conexão sucesso!");
            }).catch(error => {
                console.log("Erro!");
            });
*/

//Atualiza as colunas
sequelize.sync({ alter: true })
        .then(() => {
            console.log("BD sincronizado.");
        }).catch(error => {
            console.log("Erro!");
        });

//ROTAS: app.[Method]([Path], [Handler])
app.get('/', (req, res) => {
    res.send("Chamada ao recurso usando o get realizada com sucesso.");
});

//Retornar todos os usuários
app.get('/users', (req, res) => {
    res.send("Aqui vou retornar todos os usuários do sistema.");
});

//Retornar o usuário com um id específico
app.get('/user/:id', (req, res) => {
    console.log(req.params.id); //Valor do parâmetro 'id'
});

app.post('/rotapost', (req, res) => {
    res.send("Chamada ao recurso usando post realizada com sucesso.");
});

app.listen(PORT, () => {
    console.log("Servidor aguardando requisições.");
});
