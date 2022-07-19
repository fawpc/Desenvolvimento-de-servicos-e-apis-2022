const conexao = require('../config/config')



const bibliotecaRepository = require('../repository/bibliotecaRepository')

exports.listarLivros = (req, res) => {
    bibliotecaRepository.listarLivros((erro,livro) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(livro)
        }
    })
}

exports.listarAutores = (req, res) => {
    bibliotecaRepository.listarAutores((erro,autor) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(autor)
        }
    })
}

exports.listarClientes = (req, res) => {
    bibliotecaRepository.listarClientes((erro,clientes) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(clientes)
        }
    })
}

exports.listarAluguel = (req, res) => {
    bibliotecaRepository.listarAluguel((erro,aluguel) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(aluguel)
        }
    })
}

exports.listarAtrasados = (req, res) => {
    bibliotecaRepository.listarAtrasados((erro,atrasados) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(atrasados)
        }
    })
}

exports.inserirLivros = (req, res) => {
    //Obter o dado do request - nome, email, username, senha
    const livro = req.body;

    //SQL
    const sql = "INSERT INTO livro(titulo,fka,fke,ano) VALUES (?,?,?,?)"

    conexao.query(sql, [livro.titulo, livro.fka, livro.fke, livro.ano],
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            livro.isbn = rows.insertId;
            res.status(201).json(livro)
        }
    })
}

exports.inserirAutores = (req, res) => {
    //Obter o dado do request - nome, email, username, senha
    const autor = req.body;
    
    //SQL
    const sql = "INSERT INTO autor(nomeA,pais) VALUES (?,?)"

    conexao.query(sql, [autor.nomeA, autor.pais],
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            autor.id_autor = rows.insertId;
            res.status(201).json(autor)
        }
    })
}

exports.inserirClientes = (req, res) => {
    //Obter o dado do request - nome, email, username, senha
    const clientes = req.body;
    
    //SQL
    const sql = "INSERT INTO cliente(nome,fone) VALUES (?,?)"

    conexao.query(sql, [clientes.nome, clientes.fone],
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            clientes.matricula = rows.insertId;
            res.status(201).json(clientes)
        }
    })
}

exports.inserirAluguel = (req, res) => {
    //Obter o dado do request - nome, email, username, senha
    const aluguel = req.body;
    
    //SQL
    const sql = "INSERT INTO aluguel(fkc,fkl,fks,retirada,prevista) VALUES (?,?,?,?,?)"

    conexao.query(sql, [aluguel.fkc, aluguel.fkl, aluguel.fks, aluguel.retirada, aluguel.prevista],
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            aluguel.id_aluguel = rows.insertId;
            res.status(201).json(aluguel)
        }
    })
}

exports.buscarPorIdAluguel = (req, res) => {
    const id_aluguel = req.params.id_aluguel;
    const sql = "select id_aluguel, nome, telefone, situacao, retirada, prevista, entregue, titulo from aluguel inner join situacao on(aluguel.fkS = situacao.id_status) inner join livro on(aluguel.fkL = livro.isbn) inner join cliente on(aluguel.fkC = cliente.matricula) where id_aluguel=? order by nomeC";

    conexao.query(sql, [id_aluguel], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows && rows.length > 0){
                res.json(rows[0])
            }
            else{ 
                res.status(404).json({"msg":"asavasd"})
            }
        }
    })
}

exports.buscarPorTitulo = (req, res) => {    
    if(req.body && req.body.titulo){
        const titulo = req.body.titulo;
        bibliotecaRepository.buscarPorTitulo(titulo, (err,livro) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(livro);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar um livro."})
    }


}

exports.buscarPorNomeAutor = (req, res) => {    
    if(req.body && req.body.nome){
        const nome = req.body.nome;
        bibliotecaRepository.buscarPorNomeAutor(nome, (err,autor) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(autor);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar um autor."})
    }


}

exports.buscarPorPais = (req, res) => {    
    if(req.body && req.body.pais){
        const pais = req.body.pais;
        bibliotecaRepository.buscarPorPais(pais, (err,autor) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(autor);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar um pais."})
    }


}

exports.buscarPorNomeCliente = (req, res) => {    
    if(req.body && req.body.nome){
        const nome = req.body.nome;
        bibliotecaRepository.buscarPorNomeCliente(nome, (err,clientes) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(clientes);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar um cliente."})
    }


}

exports.buscarPorNomeClienteAluguel = (req, res) => {    
    if(req.body && req.body.nome){
        const nome = req.body.nome;
        bibliotecaRepository.buscarPorNomeClienteAluguel(nome, (err,aluguel) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(aluguel);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar um cliente."})
    }


}

exports.buscarPorAluguelAtrasado = (req, res) => {    
    if(req.body && req.body.nome){
        const nome = req.body.nome;
        bibliotecaRepository.buscarPorAluguelAtrasado(nome, (err,aluguel) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(aluguel);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar username."})
    }


}

exports.atualizarLivros = (req, res) => {
    const isbn = req.params.isbn;
    const livro = req.body;

    const sql = `UPDATE livro SET titulo=?, ano=?, fkE=?, fkA=? WHERE isbn=?`;
    conexao.query(sql, [livro.titulo, livro.ano, livro.fkE, livro.fkA, isbn], 
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            livro.isbn = +isbn; //Sinal de "+" -> converte String para number (ou usar parseInt)
            res.json(livro);
        }
    })
}

exports.atualizarAutores = (req, res) => {
    const id_autor = req.params.id_autor;
    const autor = req.body;

    const sql = `UPDATE autor SET nomeA=?, pais=? WHERE id_autor=?`;
    conexao.query(sql, [autor.nomeA, autor.pais, id_autor], 
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            autor.id_autor = +id_autor; //Sinal de "+" -> converte String para number (ou usar parseInt)
            res.json(autor);
        }
    })
}

exports.atualizarClientes = (req, res) => {
    const matricula = req.params.matricula;
    const clientes = req.body;

    const sql = `UPDATE cliente SET nomeC=?, fone=? WHERE matricula=?`;
    conexao.query(sql, [clientes.nomeC, clientes.fone, matricula], 
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            clientes.matricula = +matricula; //Sinal de "+" -> converte String para number (ou usar parseInt)
            res.json(clientes);
        }
    })
}

exports.atualizarAluguel = (req, res) => {
    const id_aluguel = req.params.id_aluguel;
    const aluguel = req.body;

    const sql = `UPDATE aluguel SET fkC=?, fkL=?, fkS=?, retirada=?, prevista=?, entregue=?, WHERE id_aluguel=?`;
    conexao.query(sql, [aluguel.fkC, aluguel.fkL, aluguel.fkS, aluguel.retirada, aluguel.prevista,aluguel.entregue, id_aluguel], 
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            aluguel.id_aluguel = +id_aluguel; //Sinal de "+" -> converte String para number (ou usar parseInt)
            res.json(aluguel);
        }
    })
}
exports.deletarLivros = (req, res) => {
    const isbn = req.params.isbn;

    const sql = `DELETE FROM livro WHERE isbn=?`;
    conexao.query(sql, [isbn], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows.affectedRows)
            res.json({"msg": `livro de ${isbn} removido com sucesso`});
        }
    })
}

exports.deletarAutores= (req, res) => {
    const id_autor = req.params.id_autor;

    const sql = `DELETE FROM autor WHERE id_autor=?`;
    conexao.query(sql, [id_autor], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows.affectedRows)
            res.json({"msg": `autor de ${id_autor} removido com sucesso`});
        }
    })
}

exports.deletarClientes = (req, res) => {
    const matricula = req.params.matricula;

    const sql = `DELETE FROM cliente WHERE matricula=?`;
    conexao.query(sql, [matricula], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows.affectedRows)
            res.json({"msg": `cliente de ${matricula} removido com sucesso`});
        }
    })
}

exports.deletarAluguel = (req, res) => {
    const id_aluguel = req.params.id_aluguel;

    const sql = `DELETE FROM aluguel WHERE id_aluguel=?`;
    conexao.query(sql, [id_aluguel], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows.affectedRows)
            res.json({"msg": `aluguel de ${id_aluguel} removido com sucesso`});
        }
    })
}
