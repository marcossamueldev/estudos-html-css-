const express = require('express');
const app = express();

app.get("/", function(req,res){
    res.send("Seja bem vindo ao meu site");
})

app.get("/artigos", function(req,res){
        res.send(`aqui esta os artigos \n artigo 1 \n artigo 2 \n artigo 3`);
})
app.get("/contato", function(req,res){
    res.send("deixe seu contato aqui");
})

app.listen(8081, "0.0.0.0", () => {
  console.log("servidor está rodando...");
});
