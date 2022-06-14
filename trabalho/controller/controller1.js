//const conexao = require('../config/config')
const {Client} = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'fabio987',
    database: 'biblioteca'
};


function listarLivros(callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT isbn, titulo, nomeEd, ano, nomeA, pais FROM livro inner join autor on ( livro.fkA = id_autor) inner join editora on ( livro.fkE = idEd)";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                callback(err.message, undefined);
            }
            else {
                let livro = res.rows;
                callback(undefined, livro);     
            }
            cliente.end();
        }
    )    
} 



function listarAutores(callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "select nomeA, pais, titulo, ano from livro inner join autor on ( livro.fkA = id_autor) order by(nomeA)";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                callback(err.message, undefined);
            }
            else {
                let autor = res.rows;
                callback(undefined, autor);     
            }
            cliente.end();
        }
    )    
} 



function listarClientes(callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT matricula, nomeC, fone FROM cliente";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                callback(err.message, undefined);
            }
            else {
                let clientes = res.rows;
                callback(undefined, clientes);     
            }
            cliente.end();
        }
    )    
}


function listarAluguel(callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "select nomeC, fone, situacao, retirada, prevista, entrega, atraso, titulo from aluguel inner join status on(aluguel.fkS = status.id_status) inner join livro on(aluguel.fkL = livro.isbn) inner join cliente on(aluguel.fkC = cliente.matricula) order by nomeC";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                callback(err.message, undefined);
            }
            else {
                let aluguel = res.rows;
                callback(undefined, aluguel);     
            }
            cliente.end();
        }
    )    
} 




exports.inserirLivros = (livro, callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
 
    //SQL
    const sql = "INSERT INTO livro(titulo,fkA,fkE,ano) VALUES ($1,$2,$3,$4)"
    values = [livro.titulo, livro.fkA, livro.fkE, livro.ano];
        cliente.query(sql, values, 
        function (err, res){
            callback(err, res.rows[0]);
            cliente.end();
        })

}

exports.inserirAutores = (autor, callback) => {

  const cliente = new Client(conexao);
    cliente.connect();
 
    //SQL
    const sql = "INSERT INTO autor(nomeA,pais) VALUES ($1,$2)"
    values = [autor.nomeA, autor.pais];
        cliente.query(sql, values, 
        function (err, res){
            callback(err, res.rows[0]);
            cliente.end();
        })

}


exports.inserirClientes = (clientes, callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
 
    //SQL
    const sql = "INSERT INTO clientes(nome,fone) VALUES ($1,$2)"
    values = [clientes.nome, clientes.fone];
        cliente.query(sql, values, 
        function (err, res){
            callback(err, res.rows[0]);
            cliente.end();
        })

}


exports.inserirAluguel = (aluguel, callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
 
    //SQL
    const sql = "INSERT INTO aluguel(fkC,fkL,fkS,retirada,prevista) VALUES ($1,$2,$3,$4,$5)"
    values = [aluguel.fkC, aluguel.fkL, aluguel.fkS, aluguel.retirada, aluguel.prevista];
        cliente.query(sql, values, 
        function (err, res){
            callback(err, res.rows[0]);
            cliente.end();
        })

}

function buscarPorIdAluguel(id, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "select id_aluguel, nome, telefone, situacao, retirada, prevista, entregue, titulo from aluguel inner join situacao on(aluguel.fkS = situacao.id_status) inner join livro on(aluguel.fkL = livro.isbn) inner join clientes on(aluguel.fkC = clientes.matricula) where id_aluguel=$1 order by nomeC";
    const values = [id_aluguel];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let aluguel = res.rows[0];
                callback(undefined, aluguel);
            }
            else {
                const error = "aluguel nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}



function buscarPorTitulo(titulo, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT isbn, titulo, nomeEd, ano, nomeA FROM livro inner join autor on ( livro.fkA = id_autor) inner join editora on ( livro.fkE = idEd) where titulo=$1";
    const values = [titulo];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let titulo = res.rows[0];
                callback(undefined, titulo);
            }
            else {
                const error = "livro nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}




function buscarPorNomeAutor(nomeA, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "select titulo, nomeEd, ano, nomeA, pais from livro inner join autor on ( livro.fkA = id_autor) inner join editora on ( livro.fkE = idEd) where nomeA =$1";
    const values = [nomeA];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let nomeA = res.rows[0];
                callback(undefined, nomeA);
            }
            else {
                const error = "livro nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}



function buscarPorPais(pais, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT pais, titulo, ano, nomeA FROM livro inner join autor on ( livro.fkA = id_autor) where pais=$1";
    const values = [pais];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let nomeA = res.rows[0];
                callback(undefined, nomeA);
            }
            else {
                const error = "livro nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}




function buscarPorNomeCliente(nomeC, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM cliente where nomeC=$1";
    const values = [nomC];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let nomeC = res.rows[0];
                callback(undefined, nomeC);
            }
            else {
                const error = "cliente nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}



function buscarPorNomeClienteAluguel(nomeC, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "select nomeC, fone, situacao, retirada, prevista, entregue, titulo from aluguel inner join situacao on(aluguel.fkS = situacao.id_status) inner join livro on(aluguel.fkL = livro.isbn) inner join clientes on(aluguel.fkC = clientes.matricula) where nome=$1 order by situacao";
    const values = [nomeC];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let nomeC = res.rows[0];
                callback(undefined, nomeC);
            }
            else {
                const error = "cliente nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}




function atualizarLivros(ISBN,livro, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE livro SET titulo=$1, ano=$2 WHERE ISBN=$3 RETURNING *"
    const values = [livro.titulo, livro.ano, ISBN];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let livro = res.rows[0];
            callback(undefined, livro);
        }
        else {
            const error = "livro nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })
}



function atualizarAutores(id_autor,livro, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE autor SET nomeA=?, pais=? WHERE id_autor=$3 RETURNING *"
    const values = [autor.nomeA, autor.pais, id_autor];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let autor = res.rows[0];
            callback(undefined, autor);
        }
        else {
            const error = "autor nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })
}





function atualizarClientes(matricula,clientes, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE clientes SET nomeC=?, fone=? WHERE matricula=$3 RETURNING *"
    const values = [clientes.nomeC, clientes.fone, matricula];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let clientes = res.rows[0];
            callback(undefined, clientes);
        }
        else {
            const error = "cliente nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })
}



function atualizarAluguel(id_aluguel,aluguel, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE aluguel SET fkC=?, fkL=?, fkS=?, retirada=?, prevista=?, entregue=?, WHERE id_aluguel=$3 RETURNING *"
    const values = [aluguel.fkC, aluguel.fkL, aluguel.fkS, aluguel.retirada, aluguel.prevista,aluguel.entregue, id_aluguel];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let aluguel = res.rows[0];
            callback(undefined, aluguel);
        }
        else {
            const error = "aluguel nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })
}






function deletarLivros(ISBN, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM livro WHERE ISBN=$1 RETURNING *"
    const values = [ISBN];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let livro = res.rows[0];
            callback(undefined, livro);
        }
        else {
            const error = "livro nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })

}



function deletarAutores(id_autor, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM autor WHERE id_autor=$1 RETURNING *"
    const values = [id_autor];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let autor = res.rows[0];
            callback(undefined, autor);
        }
        else {
            const error = "autor nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })

}




function deletarClientes(matricula, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM clientes WHERE matricula=$1 RETURNING *"
    const values = [matricula];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let matricula = res.rows[0];
            callback(undefined, matricula);
        }
        else {
            const error = "cliente nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })

}




function deletarAluguel(id_aluguel, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM aluguel WHERE id_aluguel=$1 RETURNING *"
    const values = [id_aluguel];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let aluguel = res.rows[0];
            callback(undefined, aluguel);
        }
        else {
            const error = "aluguel nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })

}

module.exports = {listarLivros, listarAluguel, listarAutores, listarClientes, atualizarLivros, atualizarAutores, atualizarClientes, atualizarAluguel, deletarLivros, deletarAutores,
    deletarClientes, deletarAluguel, buscarPorPais, buscarPorTitulo, buscarPorIdAluguel, buscarPorNomeCliente, 
    buscarPorNomeClienteAluguel, buscarPorNomeAutor};
