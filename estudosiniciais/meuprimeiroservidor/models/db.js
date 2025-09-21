const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "cadastro",
    "root",
    "DDtankmsp1@",
    {
        host: "localhost",
        dialect: "mysql"
    }
);

sequelize.authenticate().then((function(){
    console.log("banco de dados conectado com sucesso!");
})).catch(function(erro){
    console.log("falha ao se conectar: " + erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}