const conexao = require('../config/config')

exports.listar = (callback) => {
    const sql = "SELECT * FROM usuario";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}


exports.buscarPorUsername = (username, callback) => {
    const sql = "SELECT * FROM usuario where username=?";
    conexao.query(sql, [username], (err, rows) => {
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
                    msg: "usuario nao encontrado"
                }
                callback(error,null);
            }
        }
    })

}