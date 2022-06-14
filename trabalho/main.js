const bibliotecaController = require('./controller/controller1')




bibliotecaController.listarClientes(
    function(err, clientes) {
        console.log("Listar: ");
        if(err) {
            console.log("Sistema esta com problemas");
            console.log(err);
        }
        else {
            console.log(clientes);

        }
    });
/*
bibliotecaController.buscarPorNomeAutor("pedro", 
    function(erro, titulo) {
        console.log("buscarPorTitulo(dos que): ");
        if(erro) {
            console.log("Erro: "+erro);
        }
        else {
            console.log(titulo);
        }

})

/*
bibliotecaController.inserirLivros({titulo: "pop 561", fkA: 3, fkE: 1, ano:"2015"})/*, 
    function(err, inserirLivro) {
        console.log("Cenario: livro sem preco");
        if(err) {
            console.log("Sistema esta com problemas");
            console.log(err);
        }
        else {
            console.log("livro inserido: ");
            console.log(inserirLivro);
        }
    }
);


bibliotecaController.deletarLivros(7, function(erro, livro) {
    console.log("livro deletado (7): ");
    if(erro) {
        console.log("Erro: "+erro);
    }
    else {
        console.log(livro);
    }
});*/

bibliotecaController.atualizarLivros(2, {titulo: "bambrinos", ano: 2005}, 
    function(erro, livro) {
        console.log("Atualizar livro(2): ");
        if(erro) {
            console.log("Erro: "+erro);
        }
        else {
            console.log(livro);
        }
});

