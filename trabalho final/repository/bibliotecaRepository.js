const conexao = require('../config/config')


exports.listarLivros = (callback) => {
    const sql = "SELECT isbn, titulo, nomeEd, ano, nomeA FROM livro inner join autor on(livro.fka = autor.id_autor) inner join editora on(livro.fke = editora.idEd)";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.listarAutores = (callback) => {
    const sql = "SELECT nomeA, pais, titulo FROM livro inner join autor on(livro.fka = autor.id_autor)";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.listarClientes = (callback) => {
    const sql = "SELECT nomeC, fone FROM cliente";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.listarAluguel = (callback) => {
    const sql = "select nomeC, fone, situacao, retirada, prevista, entrega, atraso, titulo from aluguel inner join status on(aluguel.fks = status.id_status) inner join livro on(aluguel.fkl = livro.isbn) inner join cliente on(aluguel.fkc = cliente.matricula) order by nomeC";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.listarAtrasados = (callback) => {
    const sql = "select nomeC, fone, situacao, retirada, prevista, entrega, atraso, titulo from aluguel inner join situacao on(aluguel.fks = status.id_status) inner join livro on(aluguel.fkl = livro.isbn) inner join cliente on(aluguel.fkc = cliente.matricula) where situacao='nao devolvido' order by prevista";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}


exports.buscarPorTitulo= (titulo, callback) => {
    const sql = "SELECT isbn, titulo, nomeEd, ano, nomeA FROM livro inner join autor on(livro.fka = autor.id_autor) inner join editora on(livro.fke = editora.idEd) where titulo=?";
    conexao.query(sql, [titulo], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "titulo nao encontrado"
                }
                callback(error,null);
            }
        }
    })

}

exports.buscarPorNomeAutor= (nome, callback) => {
    const sql = "SELECT nomeA, pais, titulo, ano FROM livro inner join autor on(livro.fka = autor.id_autor) where nomeA=?";
    conexao.query(sql, [nome], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "autor nao encontrado"
                }
                callback(error,null);
            }
        }
    })

}

exports.buscarPorPais= (pais, callback) => {
    const sql = "SELECT pais, titulo, ano, nomeA FROM livro inner join autor on(livro.fkA = autor.id_autor) where pais=?";
    conexao.query(sql, [pais], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "pais nao encontrado"
                }
                callback(error,null);
            }
        }
    })

}

exports.buscarPorNomeCliente= (nome, callback) => {
    const sql = "SELECT * FROM cliente where nomeC=?";
    conexao.query(sql, [nome], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "cliente nao cadastrado"
                }
                callback(error,null);
            }
        }
    })

}

exports.buscarPorIdAluguel= (id_aluguel, callback) => {
    const sql = "select id_aluguel, nomeC, fone, situacao, retirada, prevista, entrega, atraso, titulo from aluguel inner join status on(aluguel.fks = status.id_status) inner join livro on(aluguel.fkl = livro.isbn) inner join cliente on(aluguel.fkc = cliente.matricula) where id_aluguel=? order by nomeC";
    conexao.query(sql, [id_aluguel], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "aluguel nao encontrado"
                }
                callback(error,null);
            }
        }
    })

}

exports.buscarPorNomeClienteAluguel= (nome, callback) => {
    const sql = "select nomeC, fone, situacao, retirada, prevista, entrega, atraso, titulo from aluguel inner join status on(aluguel.fks = status.id_status) inner join livro on(aluguel.fkl = livro.isbn) inner join cliente on(aluguel.fkc = cliente.matricula) where nomeC=? order by situacao";
    conexao.query(sql, [nome], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "cliente nao encontrado"
                }
                callback(error,null);
            }
        }
    })

}

exports.buscarPorAluguelAtrasado= (nome, callback) => {
    const sql = "select nomeC, fone, situacao, retirada, prevista, entrega, atraso, titulo from aluguel inner join status on(aluguel.fks = status.id_status) inner join livro on(aluguel.fkl = livro.isbn) inner join cliente on(aluguel.fkc = cliente.matricula) where nomeC=? and situacao='nao devolvido' order by prevista";
    conexao.query(sql, [nome], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "cliene nao encontrado ou nao possui livros a devolver"
                }
                callback(error,null);
            }
        }
    })

}