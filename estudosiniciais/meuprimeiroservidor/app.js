const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Produtos = require("./models/Produtos");

//configuração do body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/cadastro",function(req,res){
    Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao
    }).then(function(){
        res.send("produto cadastrado com sucesso!");
    }).catch(function(erro){
        res.send("falha ao cadastrar produto: " + erro);
    })
});

app.get("/",function(req,res){
    Produtos.findAll().then(function(produtos){
        res.send({produtos: produtos})
    }).catch(function(erro){
        res.send("falha ao listar produtos: " + erro);
    })
});

app.get("/:nome",function(req,res){
    Produtos.findAll({where: {"nome": req.params.nome}}).then(function(produtos){
        res.send(produtos);
    }).catch(function(erro){
        res.send("produto nao existe na base de dados: " + erro);
    })
})

app.patch("/atualizar/:id",function(req,res){
    Produtos.update({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao},
        {where: {"id": req.params.id}}
    ).then(function(){
        res.send("produto atualizado com sucesso!");
    }).catch(function(erro){
        res.send("falha ao atualizar produto: " + erro);
    })
});

app.delete("/deletar/:id",function(req,res){
    Produtos.destroy({where: {"id": req.params.id}}).then(function(){
        res.send("produto deletado com sucesso!");
    }).catch(function(erro){
        res.send("falha ao deletar produto: " + erro);
    })
})

app.listen(8081, "0.0.0.0", () => {
  console.log("servidor está rodando...");
});
