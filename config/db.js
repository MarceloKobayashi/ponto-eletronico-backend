// Configuração do banco de dados postgres
const { Sequelize } = require("sequelize");

//database | username | password | option {host | dialect}
const sequelize = new Sequelize('ponto', 'postgres', 'ceub123456', {
    host: 'localhost',
    dialect: 'postgres'
});

//Colocar o na lista de módulos exportados o 'sequelize'
module.exports = sequelize;
