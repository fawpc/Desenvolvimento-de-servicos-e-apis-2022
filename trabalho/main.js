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

bibliotecaController.buscarPorNomeAutor("pedro", 
    function(erro, titulo) {
        console.log("buscarPorNomeAutor(pedro): ");
        if(erro) {
            console.log("Erro: "+erro);
        }
        else {
            console.log(titulo);
        }

})


bibliotecaController.inserirLivros({titulo: "poPULAR", fkA: 4, fkE: 2, ano:"2019"}, 
    function(err, inserirLivro) {
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

/*
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


