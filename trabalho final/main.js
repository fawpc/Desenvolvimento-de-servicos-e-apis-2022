const bibliotecaController = require('./controller/controller1')


/*

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
*/

bibliotecaController.inserirAluguel({fkc: 1, fkL: 2, fkS: 1, retira:'2022.06.13', prevista:'2022.06.20'}, 

    function(err, inserirAluguel) {
        if(err) {
            console.log("Sistema esta com problemas");
            console.log(err);
        }
        else {
            console.log("livro inserido: ");
            console.log(inserirAluguel);
        }
    }
);

/*
bibliotecaController.deletarLivros(8, function(erro, livro) {
    console.log("livro deletado (9): ");
    if(erro) {
        console.log("Erro: "+erro);
    }
    else {
        console.log(livro);
    }
});
/*
bibliotecaController.atualizarLivros(2, {titulo: "bambrinas", ano: 2005}, 
    function(erro, livro) {
        console.log("Atualizar livro(2): ");
        if(erro) {
            console.log("Erro: "+erro);
        }
        else {
            console.log(livro);
        }
});

*/