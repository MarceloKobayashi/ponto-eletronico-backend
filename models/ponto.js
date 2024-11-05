const sequelize = require('../config/db');
const { DataTypes } = require('sequelize'); //Importar os tipos para os atributos

//Definir o modelo ponto
const Ponto = sequelize.define (
    'Ponto',
    {
        id_ponto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.ENUM('entrada', 'saida', 'intervalo', 'volta'),
            allowNull: false
        },
        comentario: {
            type: DataTypes.STRING,
            allowNull: true
        },
        anexo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        passado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        dataHora: {
            type: DataTypes.DATE,
            allowNull: false
        },
        localizacao: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        //Data de criação e de atualização
        timestamps: true
    }
);

module.exports = Ponto;